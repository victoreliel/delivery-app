import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import api from '../service/request';
import CheckoutTable from './Table';

export default function Checkout() {
  const [sellers, setSellers] = useState([]);
  const [formInput, setFormInput] = useState({
    seller: 'Fulana Pereira',
    address: '',
    number: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get('/users');

      setSellers(data.filter(({ role }) => role === 'seller').map((seller) => seller));
    }

    fetchData();
  }, []);

  const { cart } = useContext(Context);

  function handleChange({ target: { name, value } }) {
    setFormInput((prev) => ({ ...prev, [name]: value }));
  }

  async function handleClick() {
    const { data: { id } } = await api.post(
      '/sales',
      {
        userName: JSON.parse(localStorage.getItem('user')).name,
        sellerName: formInput.seller,
        totalPrice: Object.values(cart).reduce((a, b) => a + b.price * b.quantity, 0),
        deliveryAddress: formInput.address,
        deliveryNumber: formInput.number,
      },
      {
        headers: { authorization: JSON.parse(localStorage.getItem('user')).token },
      },
    );

    await api.post('/sales-products', {
      id,
      productIds: Object.keys(cart),
      quantities: Object.values(cart).map(({ quantity }) => quantity),
    });

    navigate(`/customer/orders/${id}`);
  }

  return (
    <>
      <CheckoutTable isHidden={ false } />
      <select
        data-testid="customer_checkout__select-seller"
        onChange={ handleChange }
        value={ formInput.seller }
      >
        {sellers.map(({ name }) => (
          <option
            key={ name }
            name="seller"
            onChange={ handleChange }
            value={ name }
          >
            {name}
          </option>
        ))}
      </select>
      <input
        data-testid="customer_checkout__input-address"
        name="address"
        onChange={ handleChange }
        type="text"
        value={ formInput.address }
      />
      <input
        data-testid="customer_checkout__input-address-number"
        name="number"
        onChange={ handleChange }
        type="text"
        value={ formInput.number }
      />
      <button
        data-testid="customer_checkout__button-submit-order"
        onClick={ handleClick }
        type="button"
      >
        Finalizar pedido
      </button>
    </>
  );
}

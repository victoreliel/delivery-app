import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/request';
import Context from '../context/Context';

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const { cart, handleIncrease, handleDecrease, handleChange } = useContext(Context);

  const getProducts = async () => {
    const apii = await api.get('/products');
    const result = apii.data;
    setProducts(result);
  };

  const navigate = useNavigate();

  const handleCartButton = () => {
    navigate('/customer/checkout');
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));

    if (Object.values(cart).some(({ quantity }) => quantity)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [cart]);

  return (
    <div>
      {products.map(({ id, name, price, urlImage }, index) => (
        <div key={ index }>
          <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
          <p
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            {price.replace(/\./, ',')}
          </p>
          <img
            data-testid={ `customer_products__img-card-bg-image-${id}` }
            src={ urlImage }
            alt="Imagem da bebida"
            height="auto"
            width="8%"
          />

          <button
            data-testid={ `customer_products__button-card-add-item-${id}` }
            type="button"
            onClick={ () => handleIncrease(id, name, price) }
          >
            +
          </button>

          <button
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            type="button"
            onClick={ () => handleDecrease(id, name, price) }
          >
            -
          </button>

          <input
            data-testid={ `customer_products__input-card-quantity-${id}` }
            onChange={ ({ target: { value } }) => handleChange(value, name, id, price) }
            value={ cart[id]?.quantity ?? 0 }
          />
        </div>
      ))}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ handleCartButton }
        disabled={ isDisabled }
      >
        <span data-testid="customer_products__checkout-bottom-value">
          {Object.values(cart)
            .reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2).replace(/\./, ',')}
        </span>
      </button>
    </div>
  );
}

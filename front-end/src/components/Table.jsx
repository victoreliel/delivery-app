import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import api from '../service/request';
import Context from '../context/Context';

function Table({ isHidden }) {
  const [data, setData] = useState([]);

  const { cart, handleRemove } = useContext(Context);

  const { id } = useParams();

  const { pathname } = useLocation();

  useEffect(() => {
    async function fetchData() {
      const result = await api.get(`/product/sales/${id}`);

      setData(result.data);
    }

    if (pathname.includes('seller')) {
      fetchData();
    }
  }, [id, pathname]);

  useEffect(() => {
    if (pathname.includes('customer')) {
      setData(Object.entries(cart)
        .map(([identifier, { name, price, quantity }]) => ({
          productId: identifier,
          quantity,
          products: {
            name, price,
          },
        })));
    }
  }, [cart, pathname]);

  function handleClick(productId) {
    setData(data.filter((product) => product.productId !== productId));

    handleRemove(productId);
  }

  let pageName = '';

  let role = '';

  if (pathname.includes('checkout')) pageName = 'checkout';

  if (pathname.includes('orders')) pageName = 'order_details';

  if (pathname.includes('customer')) role = 'customer';

  if (pathname.includes('seller')) role = 'seller';

  const DATA_TESTID_NUMBER = `${role}_${pageName}__element-order-table-item-number-`;
  const DATA_TESTID_NAME = `${role}_${pageName}__element-order-table-name-`;
  const DATA_TESTID_QUANTITY = `${role}_${pageName}__element-order-table-quantity-`;
  const DATA_TESTID_PRICE = `${role}_${pageName}__element-order-table-unit-price-`;
  const DATA_TESTID_TOTAL = `${role}_${pageName}__element-order-table-sub-total-`;
  const DATA_TESTID_TOTAL_PRICE = `${role}_${pageName}__element-order-total-price`;
  const DATA_TESTID_REMOVE = `${role}_${pageName}__element-order-table-remove-`;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {!isHidden && <th>Remover Item</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(({ productId, quantity, products: { name, price } }, index) => {
            if (quantity) {
              return (
                <tr key={ productId }>
                  <td data-testid={ DATA_TESTID_NUMBER + index }>
                    {index + 1}
                  </td>
                  <td data-testid={ DATA_TESTID_NAME + index }>
                    {name}
                  </td>
                  <td data-testid={ DATA_TESTID_QUANTITY + index }>
                    {quantity}
                  </td>
                  <td data-testid={ DATA_TESTID_PRICE + index }>
                    {Number(price).toFixed(2).replace(/\./, ',')}
                  </td>
                  <td data-testid={ DATA_TESTID_TOTAL + index }>
                    {(Number(price) * quantity).toFixed(2).replace(/\./, ',')}
                  </td>
                  <td>
                    <button
                      data-testid={ DATA_TESTID_REMOVE + index }
                      hidden={ isHidden }
                      onClick={ () => handleClick(productId) }
                      type="button"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              );
            }

            return null;
          })}
        </tbody>
      </table>

      <p data-testid={ DATA_TESTID_TOTAL_PRICE }>
        {data.reduce((a, b) => a + b.quantity * Number(b.products.price), 0).toFixed(2).replace(/\./, ',')}
      </p>
    </>
  );
}

Table.propTypes = {
  isHidden: propTypes.bool.isRequired,
};

export default Table;

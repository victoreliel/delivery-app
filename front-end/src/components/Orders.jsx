import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../service/request';
import '../pages/CustomerOrders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const { pathname } = useLocation();

  let pageName;

  if (pathname.includes('customer')) {
    pageName = 'customer';
  } else {
    pageName = 'seller';
  }

  const DATA_TESTID_ID = `${pageName}_orders__element-order-id-`;
  const DATA_TESTID_STATUS = `${pageName}_orders__element-delivery-status-`;
  const DATA_TESTID_DATE = `${pageName}_orders__element-order-date-`;
  const DATA_TESTID_PRICE = `${pageName}_orders__element-card-price-`;

  useEffect(() => {
    const getOrders = async () => {
      if (pathname.includes('customer')) {
        const { data: users } = await api.get('/users');

        const user = users.find(({ email }) => email === JSON
          .parse(localStorage.getItem('user')).email);

        const { data } = await api.get(`/customer/orders/${user.id}`);

        setOrders(data);
      } else {
        const { data: users } = await api.get('/users');

        const user = users.find(({ email }) => email === JSON
          .parse(localStorage.getItem('user')).email);

        const { data } = await api.get(`/seller/orders/${user.id}`);

        setOrders(data);
      }
    };

    getOrders();
  }, [pathname]);

  return (
    <div>
      <p>Pedidos</p>
      {orders.map(({
        id,
        saleDate,
        status,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
      }, index) => (
        <Link to={ `/${pageName}/orders/${id}` } key={ index } className="link">
          <div>
            <p data-testid={ DATA_TESTID_ID + id }>
              {id}
            </p>

            <p data-testid={ DATA_TESTID_STATUS + id }>
              {status}
            </p>

            <p data-testid={ DATA_TESTID_DATE + id }>
              {new Date(saleDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            </p>
            <p data-testid={ DATA_TESTID_PRICE + id }>
              {totalPrice.replace(/\./, ',')}
            </p>
            {pathname.includes('seller') && (
              <p data-testid={ `seller_orders__element-card-address-${id}` }>
                {`${deliveryAddress}, ${deliveryNumber}`}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

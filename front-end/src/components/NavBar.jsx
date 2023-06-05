import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [user, setUser] = useState();

  const { pathname } = useLocation();

  const getLocalStorage = () => {
    const usersString = localStorage.getItem('user');
    const userObj = JSON.parse(usersString);
    return userObj;
  };

  const navigate = useNavigate();

  const navigatePage = ({ target: { value } }) => {
    if (value === 'products') {
      navigate('/customer/products');
    } else if (value === 'orders') {
      if (pathname.includes('customer')) {
        navigate('/customer/orders');
      } else if (pathname.includes('seller')) {
        navigate('/seller/orders');
      } else {
        navigate('/admin/manage');
      }
    } else {
      localStorage.clear();
      navigate('/login');
    }
  };

  useEffect(() => {
    setUser(getLocalStorage());
  }, []);

  return (
    <nav>
      <div>
        {pathname.includes('customer') && (
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-products"
            value="products"
            onClick={ navigatePage }
          >
            Produtos
          </button>
        )}
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          value="orders"
          onClick={ navigatePage }
        >
          Pedidos
        </button>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user?.name}
        </p>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ navigatePage }
          value="logout"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

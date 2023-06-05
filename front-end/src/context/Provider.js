import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [cart, setCart] = useState({});

  useEffect(() => setCart(JSON.parse(localStorage.getItem('cart')) ?? {}), []);

  const handleIncrease = useCallback((id, name, price) => {
    if (cart[id]) {
      setCart((prev) => ({
        ...prev,
        [id]: { name, price: Number(price), quantity: cart[id].quantity + 1 },
      }));
    } else {
      setCart((prev) => ({ ...prev, [id]: { name, price: Number(price), quantity: 1 } }));
    }
  }, [cart]);

  const handleDecrease = useCallback((id, name, price) => {
    if (cart[id] && cart[id].quantity > 0) {
      setCart((prev) => ({
        ...prev,
        [id]: { name, price: Number(price), quantity: cart[id].quantity - 1 },
      }));
    } else {
      setCart((prev) => ({ ...prev, [id]: { name, price: Number(price), quantity: 0 } }));
    }
  }, [cart]);

  const handleChange = useCallback((value, name, id, price) => {
    setCart((prev) => ({
      ...prev,
      [id]: { name, price: Number(price), quantity: Number(value) },
    }));
  }, []);

  const handleRemove = useCallback((id) => {
    const newCart = cart;

    delete newCart[id];

    setCart(() => ({ ...newCart }));

    localStorage.setItem('cart', JSON.stringify(newCart));
  }, [cart]);

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const contextValue = useMemo(() => ({
    cart,
    handleIncrease,
    handleDecrease,
    handleChange,
    handleRemove,
  }), [cart, handleIncrease, handleDecrease, handleChange, handleRemove]);

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';
import Customer from './pages/Customer';
import CustomerCheckout from './pages/CustomerCheckout';
import CustomerOrders from './pages/CustomerOrders';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <Customer /> } />
        <Route path="/customer/checkout" element={ <CustomerCheckout /> } />
        <Route path="/customer/orders" element={ <CustomerOrders /> } />
        <Route path="/customer/orders/:id" element={ <CustomerOrderDetails /> } />
        <Route path="/seller/orders" element={ <CustomerOrders /> } />
        <Route path="/seller/orders/:id" element={ <CustomerOrderDetails /> } />
        <Route path="/admin/manage" element={ <AdminPanel /> } />
      </Routes>
    </Provider>
  );
}

export default App;

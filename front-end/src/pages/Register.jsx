import React from 'react';
import RegisterForm from '../components/RegisterForm';
import './Register.css';

export default function Register() {
  return (
    <div className="register">
      <h2>Cadastro</h2>
      <RegisterForm />
    </div>
  );
}

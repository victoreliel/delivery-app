import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/request';
import '../pages/Register.css';

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [button, setButton] = useState(true);

  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const handleRegisterForm = ({ target }) => {
    setInputs((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    const minimumNameLength = 12;
    const minimumPasswordLength = 6;
    const isValidName = inputs.name.length >= minimumNameLength;
    const isValidEmail = /^[^@^ ]+@[^@^ ]+\.[a-z]{2,3}(\.[a-z]{2})?$/.test(inputs.email);
    const isValidPassword = inputs.password.length >= minimumPasswordLength;
    return setButton(!(isValidName && isValidEmail && isValidPassword));
  }, [inputs]);

  const registerUser = async () => {
    try {
      await api.post('/register', {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      setIsVisible(() => false);
      navigate('/customer/products');
    } catch (e) {
      setIsVisible(() => true);
    }
  };

  return (
    <div>
      <form className="register-form">
        <p>Nome</p>
        <input
          type="text"
          name="name"
          value={ inputs.name }
          className="inputs-register"
          placeholder="Digite seu nome"
          data-testid="common_register__input-name"
          onChange={ handleRegisterForm }
        />
        <p>Email</p>
        <input
          type="text"
          name="email"
          value={ inputs.email }
          className="inputs-register"
          placeholder="Digite seu email"
          data-testid="common_register__input-email"
          onChange={ handleRegisterForm }
        />
        <p>Senha</p>
        <input
          type="text"
          name="password"
          value={ inputs.password }
          className="inputs-register"
          placeholder="Digite sua senha"
          data-testid="common_register__input-password"
          onChange={ handleRegisterForm }
        />
        <br />
        {' '}
        <br />
        <button
          type="button"
          data-testid="common_register__button-register"
          className="button-register"
          disabled={ button }
          onClick={ registerUser }
        >
          Registrar
        </button>
      </form>
      {
        isVisible && (
          <p data-testid="common_register__element-invalid_register">
            E-mail já cadastrado!
          </p>
        )
      }
    </div>
  );
}

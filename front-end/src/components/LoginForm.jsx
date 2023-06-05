import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/request';
import '../pages/Login.css';

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [button, setButton] = useState(true);

  const [isVisible, setIsVisible] = useState(false);

  const handleLoginForm = ({ target }) => {
    setInputs((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const navigate = useNavigate();

  const handleRegisterButton = () => {
    navigate('/register');
  };

  const loadUser = async () => {
    try {
      const { data } = await api.post('/login', {
        email: inputs.email,
        password: inputs.password,
      });
      localStorage.setItem('user', JSON.stringify(data));

      setIsVisible(() => false);

      if (data.role === 'customer') {
        navigate('/customer/products');
      } else if (data.role === 'seller') {
        navigate('/seller/orders');
      } else {
        navigate('/admin/manage');
      }
    } catch (e) {
      setIsVisible(() => true);
    }
  };

  useEffect(() => {
    const minimumPasswordLength = 6;
    const isValidEmail = /^[^@^ ]+@[^@^ ]+\.[a-z]{2,3}(\.[a-z]{2})?$/.test(inputs.email);
    const isValidLength = inputs.password.length >= minimumPasswordLength;
    return setButton(!(isValidEmail && isValidLength));
  }, [inputs]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      if (user.role === 'customer') {
        navigate('/customer/products');
      } else if (user.role === 'seller') {
        navigate('/seller/orders');
      } else {
        navigate('/admin/manage');
      }
    }
  }, [navigate]);

  return (
    <div>
      <form className="login-form">
        <p>Login</p>
        <input
          type="text"
          name="email"
          value={ inputs.email }
          className="inputs-login"
          placeholder="Digite seu Email"
          data-testid="common_login__input-email"
          onChange={ handleLoginForm }
        />
        <p>Senha</p>
        <input
          type="password"
          name="password"
          value={ inputs.password }
          className="inputs-login"
          placeholder="Digite sua senha"
          data-testid="common_login__input-password"
          onChange={ handleLoginForm }
        />
        <br />
        {' '}
        <br />
        <button
          type="button"
          data-testid="common_login__button-login"
          className="button-login"
          disabled={ button }
          onClick={ loadUser }
        >
          LOGIN
        </button>
        <br />
        <button
          type="button"
          data-testid="common_login__button-register"
          className="button-new-user"
          onClick={ handleRegisterButton }
        >
          Ainda não tenho conta
        </button>
      </form>
      {
        isVisible && (
          <p data-testid="common_login__element-invalid-email">
            Sua conta não existe
          </p>
        )
      }
    </div>
  );
}

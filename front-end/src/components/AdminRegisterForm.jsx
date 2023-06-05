import React, { useContext, useState } from 'react';
import api from '../service/request';
import Context from '../context/UserContext';

const SIX = 6;
const TWELVE = 12;

function AdminRegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const [isHidden, setIsHidden] = useState(true);

  const { fetchUsers } = useContext(Context);

  function handleChange({ target: { name, value } }) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const { name, email, password, role } = form;

  async function handleClick() {
    try {
      await api.post(
        '/administrator/register',
        { name, email, password, role },
        {
          headers: { authorization: JSON.parse(localStorage.getItem('user')).token },
        },
      );

      setForm({ name: '', email: '', password: '', role: 'customer' });
      setIsHidden(true);

      fetchUsers();
    } catch (e) {
      setIsHidden(false);
    }
  }

  const isDisabled = name.length < TWELVE
  || !/^[^@^ ]+@[^@^ ]+\.[a-z]{2,3}(\.[a-z]{2})?$/.test(email)
  || password.length < SIX;

  return (
    <>
      <input
        data-testid="admin_manage__input-name"
        name="name"
        onChange={ handleChange }
        type="text"
        value={ name }
      />
      <input
        data-testid="admin_manage__input-email"
        name="email"
        onChange={ handleChange }
        type="text"
        value={ email }
      />
      <input
        data-testid="admin_manage__input-password"
        name="password"
        onChange={ handleChange }
        type="text"
        value={ password }
      />
      <select
        data-testid="admin_manage__select-role"
        name="role"
        onChange={ handleChange }
        value={ role }
      >
        <option value="customer">Consumidor</option>
        <option value="seller">Vendedor</option>
        <option value="administrator">Administrador</option>
      </select>
      <button
        data-testid="admin_manage__button-register"
        disabled={ isDisabled }
        onClick={ handleClick }
        type="button"
      >
        CADASTRAR
      </button>
      <span
        data-testid="admin_manage__element-invalid-register"
        hidden={ isHidden }
      >
        E-mail já cadastrado!
      </span>
    </>
  );
}

export default AdminRegisterForm;

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import api from '../../service/request';
import renderWithRouter from '../helpers/renderWith';

import App from '../../App';
import {
  emailInput,
  passwordInput,
  loginBtn,
  registerBtn,
  emailInvalidElement,
  logOutBtn,
} from '../mocks/dataTestId';
import {
  emailPass,
  emailFail,
  password,
  loginResultMock,
} from '../mocks/loginMock';

// jest.mock('axios');

describe('Testa a pagina de Login', () => {
  describe('Testa se os elementos estão na tela', () => {
    it('Testa a renderização da tela', () => {
      renderWithRouter(<App />, { route: '/login' });
    });

    it('Testa se os componentes estão na tela', () => {
      renderWithRouter(<App />, { route: '/login' });

      const inputEmail = screen.getByTestId(emailInput);
      const inputPassword = screen.getByTestId(passwordInput);
      const login = screen.getByTestId(loginBtn);
      const register = screen.getByTestId(registerBtn);

      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(login).toBeInTheDocument();
      expect(register).toBeInTheDocument();
    });
  });

  describe('Testa as verificações do login form', () => {
    it('Testa se inicialmente o login esta desabilitado', () => {
      renderWithRouter(<App />, { route: '/login' });
      const login = screen.getByTestId(loginBtn);
      expect(login).toBeDisabled();
    });

    it('Testa se não é possivel fazer login com um email errado', async () => {
      const { user } = renderWithRouter(<App />, { route: '/login' });

      const inputEmail = screen.getByTestId(emailInput);
      const inputPassword = screen.getByTestId(passwordInput);
      const login = screen.getByTestId(loginBtn);

      await user.type(inputEmail, emailFail);
      await user.type(inputPassword, password);

      expect(login).not.toBeDisabled();

      await user.click(login);

      await waitFor(() => {
        const emailWarning = screen.getByTestId(emailInvalidElement);
        expect(emailWarning).toBeInTheDocument();
      });
    });
  });

  describe('Testa a funcionalidade do login form', () => {
    it('Testa se é possivel ir para a tela de registro a partir do login', async () => {
      const { user } = renderWithRouter(<App />, { route: '/login' });

      const register = screen.getByTestId(registerBtn);

      await user.click(register);

      expect(window.history.state.idx).toBe(1);
    });

    test('Testa se é possivel realizar o login', async () => {
      jest.spyOn(api, 'post').mockResolvedValue({ data: loginResultMock });

      const { user } = renderWithRouter(<App />, { route: '/login' });

      const inputEmail = screen.getByTestId(emailInput);
      const inputPassword = screen.getByTestId(passwordInput);
      const login = screen.getByTestId(loginBtn);

      await user.type(inputEmail, emailPass);
      await user.type(inputPassword, password);

      await user.click(login);

      await waitFor(() => {
        expect(window.history.state.idx).toBe(1);

        const logOut = screen.getByTestId(logOutBtn);
        expect(logOut).toBeInTheDocument();
      });
    });
  });
});

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import api from '../../service/request';
import renderWithRouter from '../helpers/renderWith';

import App from '../../App';
import {
  nameInput,
  emailInputRgtr,
  passwordInputRgtr,
  registerBtnRgtr,
  registerEmailInvalid,
  logOutBtn,
} from '../mocks/dataTestId';
import {
  nameMock,
  emailPassMock,
  emailFailMock,
  passwordMock,
} from '../mocks/registerMock';

describe('Testa a pagina de Registro', () => {
  describe('Testa se os elementos estão na tela', () => {
    it('Testa a renderização da tela', () => {
      renderWithRouter(<App />, { route: '/register' });
    });

    it('Testa se os componentes estão na tela', () => {
      renderWithRouter(<App />, { route: '/register' });

      const nameInpt = screen.getByTestId(nameInput);
      const emailInpt = screen.getByTestId(emailInputRgtr);
      const passwordInpt = screen.getByTestId(passwordInputRgtr);
      const registerBtn = screen.getByTestId(registerBtnRgtr);

      expect(nameInpt).toBeInTheDocument();
      expect(emailInpt).toBeInTheDocument();
      expect(passwordInpt).toBeInTheDocument();
      expect(registerBtn).toBeInTheDocument();
    });
  });

  describe('Testa as verificações do register form', () => {
    it('Testa se inicialmente o registro esta desabilitado', () => {
      renderWithRouter(<App />, { route: '/register' });

      const registerBtn = screen.getByTestId(registerBtnRgtr);

      expect(registerBtn).toBeDisabled();
    });

    it('Testa se não é possivel fazer registro de um email ja existente', async () => {
      const { user } = renderWithRouter(<App />, { route: '/register' });

      const nameInpt = screen.getByTestId(nameInput);
      const emailInpt = screen.getByTestId(emailInputRgtr);
      const passwordInpt = screen.getByTestId(passwordInputRgtr);
      const registerBtn = screen.getByTestId(registerBtnRgtr);

      await user.type(nameInpt, nameMock);
      await user.type(emailInpt, emailFailMock);
      await user.type(passwordInpt, passwordMock);

      expect(registerBtn).not.toBeDisabled();

      await user.click(registerBtn);

      await waitFor(() => {
        const emailInvalid = screen.getByTestId(registerEmailInvalid);
        expect(emailInvalid).toBeInTheDocument();
      });
    });
  });

  describe('Testa as funcionalidades da pagina de register', () => {
    it('Testa se ao fazer o login redireciona para a pagina de produtos', async () => {
      jest.spyOn(api, 'post').mockResolvedValue();

      const { user } = renderWithRouter(<App />, { route: '/register' });

      const nameInpt = screen.getByTestId(nameInput);
      const emailInpt = screen.getByTestId(emailInputRgtr);
      const passwordInpt = screen.getByTestId(passwordInputRgtr);
      const registerBtn = screen.getByTestId(registerBtnRgtr);

      await user.type(nameInpt, nameMock);
      await user.type(emailInpt, emailPassMock);
      await user.type(passwordInpt, passwordMock);

      expect(registerBtn).not.toBeDisabled();

      await user.click(registerBtn);

      await waitFor(() => {
        expect(window.history.state.idx).toBe(1);

        const logOut = screen.getByTestId(logOutBtn);
        expect(logOut).toBeInTheDocument();
      });
    });
  });
});

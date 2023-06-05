import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import api from '../../service/request';
import renderWithRouter from '../helpers/renderWith';

import App from '../../App';
// import {
//   productPageBtn,
//   orderPageBtn,
//   logOutBtn,
//   clientName,
//   totalValueBtn,
// } from '../mocks/dataTestId';
// import { productMock } from '../mocks/productsMock';

describe('Testa a pagina de Produtos', () => {
  it('Testa se a tela é renderizada', () => {
    renderWithRouter(<App />, { route: '/customer/products' });
  });

  // it('Testa se os elementos estão na tela', () => {
  //   jest.spyOn(api, 'get').mockResolvedValue({ data: [productMock] });

  //   renderWithRouter(<App />, { route: '/customer/products' });

  //   const productBtn = screen.getByTestId(productPageBtn);
  //   const orderBtn = screen.getByTestId(orderPageBtn);
  //   const logOut = screen.getByTestId(logOutBtn);
  //   const nameClient = screen.getByTestId(clientName);
  //   const totalValue = screen.getByTestId(totalValueBtn);

  //   expect(productBtn).toBeInTheDocument();
  //   expect(orderBtn).toBeInTheDocument();
  //   expect(logOut).toBeInTheDocument();
  //   expect(nameClient).toBeInTheDocument();
  //   expect(totalValue).toBeInTheDocument();
  // });
});

const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../api/app');
const SaleProductService = require('../../services/saleProduct.service');
const { saleProductMock } = require('../mocks/saleProductMock');

describe('Testa a rota de saleProduct', () => {
  it('Testa se a rota /sales-products cria a tabela corretamente', async () => {
    sinon
      .stub(SaleProductService, 'create')
      .resolves();

    const { status } = await chai
      .request(app)
      .post('/sales-products')
      .send(saleProductMock);

    expect(status).to.be.equal(201);
  });
});

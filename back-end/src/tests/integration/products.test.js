const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../api/app');
const ProductService = require('../../services/product.service');
const {
  productsMock
} = require('../mocks/productsMock');

describe('Testa a funcionalidade da rota "/products', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('testa a "/products" em caso de sucesso', async () => {
    sinon
      .stub(ProductService, 'findAll')
      .resolves(productsMock);
    
    const { status, body } = await chai
      .request(app)
      .get('/products');
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(productsMock);
  });  
});

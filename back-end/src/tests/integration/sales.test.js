const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../api/app');
const UserService = require('../../services/user.service');
const SaleService = require('../../services/sale.service');
const {
  idMock,
  saleRequestMock,
  saleMock,
  tokenMock,
} = require('../mocks/salesMock');

describe('Testa a funcionalidade da sales', () => {
  
  afterEach(() => {
    sinon.restore();
  });

  describe('Testa a rota post "/sales"', () => {
    describe('Testa as verificações da rota /sales', () => {
      it('Testa se não é possivel cadastrar uma venda sem autorização', async () => {
        const { status, body } = await chai
          .request(app)
          .post('/sales')
          .set({ authorization: '' });
        
        expect(status).to.be.equal(401);
        expect(body).to.be.deep.equal({ message: 'jwt must be provided' });
      });
      
      it('Testa se é necessario mandar o nome do usuario', async () => {
        const { status, body } = await chai
          .request(app)
          .post('/sales')
          .set({ authorization: tokenMock})
          .send();
  
        expect(status).to.be.equal(500);
        expect(body).to.be.deep.equal({ message: 'WHERE parameter \"name\" has invalid \"undefined\" value' });
      });
  
      it('Testa se é necessario mandar o nome do vendedor', async () => {
        const { status, body } = await chai
          .request(app)
          .post('/sales')
          .set({ authorization: tokenMock})
          .send({
            userName: 'Cliente Zé Birita',
            totalPrice: 123,
            deliveryAddress: 'address',
            deliveryNumber: 123
          });
  
        expect(status).to.be.equal(500);
        expect(body).to.be.deep.equal({ message: 'WHERE parameter \"name\" has invalid \"undefined\" value' });
      });
  
      it('Testa se é necessario mandar o valor total', async () => {
        const { status, body } = await chai
          .request(app)
          .post('/sales')
          .set({ authorization: tokenMock})
          .send({
            userName: 'Cliente Zé Birita',
            sellerName: 'Fulana Pereira',
            deliveryAddress: 'address',
            deliveryNumber: 123
          });
  
        expect(status).to.be.equal(500);
        expect(body).to.be.deep.equal({ message: "Field 'total_price' doesn't have a default value" });
      });
  
      it('Testa se é necessario mandar o endereço', async () => {
        const { status, body } = await chai
          .request(app)
          .post('/sales')
          .set({ authorization: tokenMock})
          .send({
            userName: 'Cliente Zé Birita',
            sellerName: 'Fulana Pereira',
            totalPrice: 123,
            deliveryNumber: 123
          });
  
        expect(status).to.be.equal(500);
        expect(body).to.be.deep.equal({ message: "Field 'delivery_address' doesn't have a default value" });
      });
  
      it('Testa se é necessario mandar o numero do endereço', async () => {
        const { status, body } = await chai
          .request(app)
          .post('/sales')
          .set({ authorization: tokenMock})
          .send({
            userName: 'Cliente Zé Birita',
            sellerName: 'Fulana Pereira',
            totalPrice: 123,
            deliveryAddress: 'address',
          });
  
        expect(status).to.be.equal(500);
        expect(body).to.be.deep.equal({ message: "Field 'delivery_number' doesn't have a default value" });
      });
    });
  
    describe('Testa é possivel registrar uma venda corretamente', () => {
      it('Testa se a rota post /sales cria uma venda', async () => {
        sinon
          .stub(UserService, 'findOneByName')
          .resolves(idMock);
        sinon
          .stub(SaleService, 'create')
          .resolves(idMock);
    
        const { status, body } = await chai
          .request(app)
          .post('/sales')
          .set({ authorization: tokenMock})
          .send(saleRequestMock);
    
        expect(status).to.be.equal(201);
        expect(body).to.be.deep.equal({ id: 1 });
      });
    });
  });

  describe('Testa a rota get "/sales"', () => {
    it('Testa se a rota /sales retorna um array com as vendas', async () => {
      sinon
        .stub(SaleService, 'getAll')
        .resolves([saleMock]);
      
      const { status, body } = await chai
        .request(app)
        .get('/sales');
      
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal([saleMock]);
    });

    it('Testa se é possivel retornar uma venda pelo id', async () => {
      sinon
        .stub(SaleService, 'findByPk')
        .resolves(saleMock);
      
      const { status, body } = await chai
        .request(app)
        .get('/sales/1');
      
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(saleMock);
    });

    it('Testa se é possivel retornar uma venda pelo id do usuario', async () => {
      sinon
        .stub(SaleService, 'findAllByUserId')
        .resolves(saleMock);
      
      const { status, body } = await chai
        .request(app)
        .get('/customer/orders/1');
      
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(saleMock);
    });

    it('Testa se é possivel retornar uma venda pelo id do vendedor', async () => {
      sinon
        .stub(SaleService, 'findAllBySellerId')
        .resolves(saleMock);
      
      const { status, body } = await chai
        .request(app)
        .get('/seller/orders/1');
      
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(saleMock);
    });
  });
});

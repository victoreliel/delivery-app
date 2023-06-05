const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../api/app');
const UserService = require('../../services/user.service');
const {
  loginMock,
  userMock,
  registerMock,
} = require('../mocks/userMocks')

describe('Testa a funcionalidade da rota "/register"', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('testa a "/register" em caso de erro', async () => {
    sinon
      .stub(UserService, 'findOneByEmail')
      .resolves(userMock);

    const { status } = await chai
      .request(app)
      .post('/register')
      .send(loginMock);

    expect(status).to.be.equal(409);
  });

  it('testa a "/register" em caso de sucesso', async () => {
    sinon
      .stub(UserService, 'findOneByEmail')
      .resolves();
    sinon
      .stub(UserService, 'create')
      .resolves();
    
    const { status } = await chai
      .request(app)
      .post('/register')
      .send(registerMock);

    expect(status).to.be.equal(201);
  });
});

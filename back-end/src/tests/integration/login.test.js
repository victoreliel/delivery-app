const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../api/app');
const UserService = require('../../services/user.service');
const {
  loginMock,
  userMock,
  bodyResponse,
} = require('../mocks/userMocks');

describe('Testa a funcionalidade da rota "/login"', () => {
  
  afterEach(() => {
    sinon.restore();
  });

  it('testa a "/login" em caso de erro', async () => {
    sinon
      .stub(UserService, 'findOneByEmail')
      .resolves();

    const { status } = await chai
      .request(app)
      .post('/login')
      .send({});

    expect(status).to.be.equal(404);
  });

  it('testa a "/login" em caso de sucesso', async () => {
    sinon
      .stub(UserService, 'findOneByEmail')
      .resolves(userMock);
    sinon
      .stub(jsonwebtoken, 'sign')
      .callsFake(() => 'token');

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(loginMock);

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(bodyResponse);
  });
});

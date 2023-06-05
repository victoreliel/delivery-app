const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../api/app');
const UserService = require('../../services/user.service');
const { usersMock } = require('../mocks/userMocks');

describe('Testa a funcionalidade da rota "/users"', () => {
  
  afterEach(() => {
    sinon.restore();
  });

  it('Testa se a rota /users retorna um array com usuarios', async () => {
    sinon
      .stub(UserService, 'findAll')
      .resolves(usersMock);

    const { status, body } = await chai
      .request(app)
      .get('/users');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(usersMock);
  });
});
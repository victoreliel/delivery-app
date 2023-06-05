const loginMock = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const userMock = {
  dataValues: {
    name: 'zebirita',
    email: 'zebirita@email.com',
    role: 'costumer',
    password: '1c37466c159755ce1fa181bd247cb925',
  },
};

const bodyResponse = {
  name: 'zebirita',
  email: 'zebirita@email.com',
  role: 'costumer',
  token: 'token'
};

const registerMock = {
  name: 'zebiritinha',
  email: 'zebiritinha@email.com',
  password: '$#zebiritinha#$',
};

const usersMock = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator'
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller'
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer'
  },
];

module.exports = {
  loginMock,
  userMock,
  bodyResponse,
  registerMock,
  usersMock,
};

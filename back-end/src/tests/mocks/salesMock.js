const idMock = {
  dataValues: { id: 1 },
};

const saleRequestMock = {
  userName: 'Cliente Zé Birita',
  sellerName: 'Fulana Pereira',
  totalPrice: 123,
  deliveryAddress: 'address',
  deliveryNumber: 123
};

const saleMock = {
  id: 1,
  userId: 1,
  sellerId: 1,
  totalPrice: 123,
  deliveryAddress: 'address',
  deliveryNumber: 123,
  saleDate: '01/23/4567',
  status: 'Pendente',
};

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsImlhdCI6MTY3ODQxMjU5OSwiZXhwIjoxNjc5MDE3Mzk5fQ.JgDT8gBOsbFVdwPtXByI9B6DfYibqEUgUltiGXWUMrw'

module.exports = {
  idMock,
  saleRequestMock,
  saleMock,
  tokenMock,
};

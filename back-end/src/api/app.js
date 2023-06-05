const express = require('express');
const cors = require('cors');

const UserRouter = require('../routes/user.route');
const ProductRouter = require('../routes/product.route');
const SaleRouter = require('../routes/sale.route');
const SalesProductsRouter = require('../routes/sale-product.route');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.static('public'));

app.use(UserRouter);
app.use(ProductRouter);
app.use(SaleRouter);
app.use(SalesProductsRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

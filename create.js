const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { createValidator } = require('express-joi-validation');
const Joi = require('joi');
const connection = require('./database');

const app = express();
const validator = createValidator();

app.use(express.json());

const transactionSchema = Joi.object({
  date: Joi.date().required(),
  productname: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  customername: Joi.string().required(),
  transaction: Joi.string().required(),
  refundable: Joi.boolean().required(),
  mode_of_payment: Joi.string().valid('cash', 'card', 'e-wallet').required()
});

app.post('/transactions', validator.body(transactionSchema), (req, res) => {
  const id = uuidv4();
  const { date, productname, description, price, customername, transaction, refundable, mode_of_payment } = req.body;

  const query = 'INSERT INTO transactions (id, date, productname, description, price, customername, transaction, refundable, mode_of_payment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [id, date, productname, description, price, customername, transaction, refundable, mode_of_payment], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, ...req.body });
  });
});

module.exports = app;
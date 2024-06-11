const express = require('express');
const { createValidator } = require('express-joi-validation');
const Joi = require('joi');
const connection = require('./database');

const app = express();
const validator = createValidator();

app.use(express.json());

const updateTransactionSchema = Joi.object({
  date: Joi.date().optional(),
  productname: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  customername: Joi.string().optional(),
  transaction: Joi.string().optional(),
  refundable: Joi.boolean().optional(),
  mode_of_payment: Joi.string().valid('cash', 'card', 'e-wallet').optional()
});

app.put('/transactions/:id', validator.body(updateTransactionSchema), (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
  const values = Object.values(updates);

  const query = `UPDATE transactions SET ${fields} WHERE id = ?`;
  connection.query(query, [...values, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction updated successfully' });
  });
});

module.exports = app;
const Joi = require('joi');

const transactionSchema = Joi.object({
  date: Joi.date().required(),
  productName: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  customerName: Joi.string().required(),
  transaction: Joi.string().required(),
  refundable: Joi.boolean().required(),
  modeOfPayment: Joi.string().required().valid('cash', 'card', 'e-wallet'),
});

module.exports = transactionSchema;
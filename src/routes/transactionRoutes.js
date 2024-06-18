const express = require('express');
const { createValidator } = require('express-joi-validation');
const transactionController = require('../controllers/transactionController');
const transactionSchema = require('../schemas/transactionSchema');

const router = express.Router();
const validator = createValidator();

router.post('/', validator.body(transactionSchema), transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', validator.body(transactionSchema), transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
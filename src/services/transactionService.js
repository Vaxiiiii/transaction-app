const Transaction = require('../models/transaction');

const createTransaction = async (transactionData) => {
  return await Transaction.create(transactionData);
};

const getTransactions = async () => {
  return await Transaction.findAll();
};

const getTransactionById = async (id) => {
  return await Transaction.findByPk(id);
};

const updateTransaction = async (id, transactionData) => {
  const [updated] = await Transaction.update(transactionData, {
    where: { id: id },
  });
  return updated ? await Transaction.findByPk(id) : null;
};

const deleteTransaction = async (id) => {
  return await Transaction.destroy({
    where: { id: id },
  });
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};

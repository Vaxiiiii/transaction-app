const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transaction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refundable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  modeOfPayment: {
    type: DataTypes.ENUM('cash', 'card', 'e-wallet'),
    allowNull: false,
  },
});

module.exports = Transaction;
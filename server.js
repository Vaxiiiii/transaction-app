const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./src/models');
const transactionRoutes = require('./src/routes/transactionRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/transactions', transactionRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
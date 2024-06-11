const express = require('express');
const connection = require('./database');

const app = express();

app.get('/transactions/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM transactions WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(results[0]);
  });
});

module.exports = app;
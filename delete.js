const express = require('express');
const connection = require('./database');

const app = express();

app.delete('/transactions/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM transactions WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  });
});

module.exports = app;
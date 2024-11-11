const db = require('./db');

const getAllTransactions = (req, res) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
};

const addTransaction = (req, res) => {
  const { dateTime, author, sum, category, comment } = req.body;
  db.run(
    `INSERT INTO transactions (dateTime, author, sum, category, comment) VALUES (?, ?, ?, ?, ?)`,
    [dateTime, author, sum, category, comment],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
};

module.exports = { getAllTransactions, addTransaction };

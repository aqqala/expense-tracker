const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getAllTransactions, addTransaction } = require('./transactions.controller');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/transactions', getAllTransactions);
app.post('/api/transactions', addTransaction);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

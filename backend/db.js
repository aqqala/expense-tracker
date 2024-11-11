const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./expenses.db', (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
  } else {
    console.log('Подключено к базе данных SQLite');
  }
});

// Создаём таблицу transactions, если её нет
db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dateTime TEXT,
    author TEXT,
    sum REAL,
    category TEXT,
    comment TEXT
  )
`, (err) => {
  if (err) {
    console.error('Ошибка создания таблицы:', err.message);
  } else {
    console.log('Таблица transactions готова');
  }
});

module.exports = db;

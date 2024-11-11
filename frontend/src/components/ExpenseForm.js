import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ExpenseForm.css';

const ExpenseForm = () => {
  const [date, setDate] = useState(new Date());
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState('Food');
  const [comment, setComment] = useState('');

  const categories = ['Еда', 'Транспорт', 'Развлечения'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      dateTime: date.toISOString(),
      author: 'User',
      sum: parseFloat(sum),
      category,
      comment,
    };

    const response = await fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      alert('Данные успешно добавлены!');
    } else {
      alert('Не получилось добавить данные.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Дата:</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>
      <div>
        <label>Сумма:</label>
        <input
          type="number"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Категория:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Комментарий:</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit">Добавить расход</button>
    </form>
  );
};

export default ExpenseForm;

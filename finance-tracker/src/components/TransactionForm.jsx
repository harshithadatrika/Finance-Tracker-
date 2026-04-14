import { useMemo, useState } from 'react';

const incomeCategories = ['Salary', 'Freelance', 'Bonus', 'Investment', 'Other'];
const expenseCategories = ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Other'];

function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    category: 'Salary',
    date: '',
    note: '',
  });

  const [formError, setFormError] = useState('');

  const availableCategories = useMemo(() => {
    return formData.type === 'income' ? incomeCategories : expenseCategories;
  }, [formData.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'type') {
      setFormData((prev) => ({
        ...prev,
        type: value,
        category: value === 'income' ? incomeCategories[0] : expenseCategories[0],
      }));
      setFormError('');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amountNumber = Number(formData.amount);

    if (!formData.type) {
      setFormError('Transaction type is required.');
      return;
    }

    if (!formData.amount || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setFormError('Amount must be a positive number.');
      return;
    }

    if (!formData.category) {
      setFormError('Category is required.');
      return;
    }

    if (!formData.date) {
      setFormError('Date is required.');
      return;
    }

    const newTransaction = {
      id: crypto.randomUUID(),
      type: formData.type,
      amount: amountNumber,
      category: formData.category,
      date: formData.date,
      note: formData.note.trim(),
    };

    onAddTransaction(newTransaction);

    setFormData({
      type: 'income',
      amount: '',
      category: 'Salary',
      date: '',
      note: '',
    });
  };

  return (
    <div className="card glass-card">
      <div className="section-header">
        <h2>Add Transaction</h2>
        <p>Create a new income or expense entry</p>
      </div>

      {formError && <p className="error-message">{formError}</p>}

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-row">
          <label>
            Type
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          <label>
            Amount
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Category
            <select name="category" value={formData.category} onChange={handleChange}>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          Note
          <input
            type="text"
            name="note"
            placeholder="Optional note"
            value={formData.note}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="primary-btn">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
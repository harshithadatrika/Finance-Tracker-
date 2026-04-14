import { useMemo, useState } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SummaryCards from './components/SummaryCards';
import Filters from './components/Filters';
import CategoryBreakdown from './components/CategoryBreakdown';
import MonthlyExpenseChart from './components/MonthlyExpenseChart';
import useLocalStorage from './hooks/useLocalStorage';
import {
  calculateSummary,
  filterTransactions,
  getCategoryBreakdown,
  getMonthlyExpenseData,
  sampleTransactions,
} from './utils/helpers';

function App() {
  const [transactions, setTransactions] = useLocalStorage(
    'transactions',
    sampleTransactions
  );

  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    startDate: '',
    endDate: '',
  });

  const summary = useMemo(() => calculateSummary(transactions), [transactions]);

  const filteredTransactions = useMemo(() => {
    return filterTransactions(transactions, filters);
  }, [transactions, filters]);

  const categoryData = useMemo(() => {
    return getCategoryBreakdown(transactions);
  }, [transactions]);

  const monthlyExpenseData = useMemo(() => {
    return getMonthlyExpenseData(transactions);
  }, [transactions]);

  const handleAddTransaction = (newTransaction) => {
    setError('');

    if (
      newTransaction.type === 'expense' &&
      newTransaction.amount > summary.balance
    ) {
      setError('Expense cannot be greater than current balance.');
      return;
    }

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  const handleLoadDemoData = () => {
    setTransactions(sampleTransactions);
    setError('');
  };

  const handleClearAll = () => {
    setTransactions([]);
    setError('');
  };

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="hero-section">
          <div className="hero-left">
            <p className="eyebrow">Smart Money Dashboard</p>
            <h1 className="app-title">Personal Finance Tracker</h1>
            <p className="app-subtitle">
              Track income, manage spending, monitor trends, and understand your
              financial habits with a modern dashboard.
            </p>

            <div className="hero-actions">
              <button className="hero-btn" onClick={handleLoadDemoData}>
                Load Demo Data
              </button>
              <button
                className="hero-btn secondary-hero-btn"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="hero-stat-number">{transactions.length}</div>
            <div className="hero-stat-label">Transactions</div>
          </div>
        </header>

        {error && <p className="error-message">{error}</p>}

        <SummaryCards summary={summary} />

        <div className="dashboard-grid">
          <TransactionForm onAddTransaction={handleAddTransaction} />
          <CategoryBreakdown
            categoryData={categoryData}
            totalExpenses={summary.totalExpenses}
          />
        </div>

        <div className="middle-grid">
          <MonthlyExpenseChart data={monthlyExpenseData} />
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        <TransactionList
          transactions={filteredTransactions}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </div>
  );
}

export default App;
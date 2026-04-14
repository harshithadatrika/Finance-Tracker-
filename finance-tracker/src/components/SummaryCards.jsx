import { formatCurrency } from '../utils/helpers';

function SummaryCards({ summary }) {
  return (
    <div className="summary-grid">
      <div className="summary-card income-card">
        <div className="summary-label">Total Income</div>
        <h3>{formatCurrency(summary.totalIncome)}</h3>
        <p>Money received across all sources</p>
      </div>

      <div className="summary-card expense-card">
        <div className="summary-label">Total Expenses</div>
        <h3>{formatCurrency(summary.totalExpenses)}</h3>
        <p>Money spent across all categories</p>
      </div>

      <div className="summary-card balance-card">
        <div className="summary-label">Remaining Balance</div>
        <h3>{formatCurrency(summary.balance)}</h3>
        <p>Net available financial balance</p>
      </div>
    </div>
  );
}

export default SummaryCards;
import { formatCurrency, formatDate } from '../utils/helpers';

function TransactionItem({ transaction, onDeleteTransaction }) {
  const { id, type, amount, category, date, note } = transaction;

  return (
    <div className={`transaction-item ${type}`}>
      <div className="transaction-left">
        <div className={`transaction-icon ${type}`}>
          {type === 'income' ? '↗' : '↘'}
        </div>

        <div>
          <p className="transaction-category">{category}</p>
          <p className="transaction-date">{formatDate(date)}</p>
          {note ? <p className="transaction-note">{note}</p> : null}
        </div>
      </div>

      <div className="transaction-right">
        <p className={`transaction-amount ${type}`}>
          {type === 'income' ? '+' : '-'}
          {formatCurrency(amount)}
        </p>
        <p className="transaction-type">{type}</p>
        <button
          className="delete-btn"
          onClick={() => onDeleteTransaction(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TransactionItem;
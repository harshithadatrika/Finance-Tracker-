import TransactionItem from './TransactionItem';

function TransactionList({ transactions, onDeleteTransaction }) {
  return (
    <div className="card glass-card">
      <div className="section-header transaction-list-header">
        <div>
          <h2>Recent Transactions</h2>
          <p>{transactions.length} result(s) found</p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <h3>No transactions found</h3>
          <p>Try changing your filters or add a new transaction.</p>
        </div>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDeleteTransaction={onDeleteTransaction}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;
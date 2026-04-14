import { formatCurrency } from '../utils/helpers';

function CategoryBreakdown({ categoryData, totalExpenses }) {
  return (
    <div className="card glass-card">
      <div className="section-header">
        <h2>Category Breakdown</h2>
        <p>See where your spending is going</p>
      </div>

      {categoryData.length === 0 ? (
        <div className="empty-state">
          <h3>No expense data yet</h3>
          <p>Add expense transactions to see category insights.</p>
        </div>
      ) : (
        <div className="breakdown-list">
          {categoryData.map((item) => {
            const percentage =
              totalExpenses > 0 ? (item.total / totalExpenses) * 100 : 0;

            return (
              <div key={item.category} className="breakdown-item">
                <div className="breakdown-top">
                  <span>{item.category}</span>
                  <span>{formatCurrency(item.total)}</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryBreakdown;
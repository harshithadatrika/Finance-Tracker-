import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { formatCurrency } from '../utils/helpers';

function MonthlyExpenseChart({ data }) {
  return (
    <div className="card glass-card">
      <div className="section-header">
        <h2>Monthly Expense Overview</h2>
        <p>Track how much you spent each month</p>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">
          <h3>No monthly expense data</h3>
          <p>Add expense transactions to see the chart.</p>
        </div>
      ) : (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="expenses" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default MonthlyExpenseChart;
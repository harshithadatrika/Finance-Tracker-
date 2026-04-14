export const sampleTransactions = [
  {
    id: '1',
    type: 'income',
    amount: 5000,
    category: 'Salary',
    date: '2026-01-05',
    note: 'Monthly salary',
  },
  {
    id: '2',
    type: 'expense',
    amount: 220,
    category: 'Food',
    date: '2026-01-08',
    note: 'Groceries',
  },
  {
    id: '3',
    type: 'expense',
    amount: 120,
    category: 'Travel',
    date: '2026-01-12',
    note: 'Fuel',
  },
  {
    id: '4',
    type: 'expense',
    amount: 340,
    category: 'Bills',
    date: '2026-01-18',
    note: 'Electricity and internet',
  },
  {
    id: '5',
    type: 'income',
    amount: 800,
    category: 'Freelance',
    date: '2026-02-03',
    note: 'Website project',
  },
  {
    id: '6',
    type: 'expense',
    amount: 180,
    category: 'Shopping',
    date: '2026-02-06',
    note: 'Clothes',
  },
  {
    id: '7',
    type: 'expense',
    amount: 90,
    category: 'Health',
    date: '2026-02-10',
    note: 'Medicines',
  },
  {
    id: '8',
    type: 'expense',
    amount: 260,
    category: 'Food',
    date: '2026-02-16',
    note: 'Dining out',
  },
  {
    id: '9',
    type: 'income',
    amount: 5000,
    category: 'Salary',
    date: '2026-03-05',
    note: 'Monthly salary',
  },
  {
    id: '10',
    type: 'expense',
    amount: 410,
    category: 'Bills',
    date: '2026-03-07',
    note: 'Rent utilities',
  },
  {
    id: '11',
    type: 'expense',
    amount: 150,
    category: 'Entertainment',
    date: '2026-03-11',
    note: 'Movies and subscriptions',
  },
  {
    id: '12',
    type: 'expense',
    amount: 300,
    category: 'Travel',
    date: '2026-03-14',
    note: 'Weekend trip',
  },
];

export function calculateSummary(transactions) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  };
}

export function filterTransactions(transactions, filters) {
  return transactions.filter((transaction) => {
    const searchText = filters.search?.toLowerCase().trim() || '';
    const noteText = transaction.note?.toLowerCase() || '';
    const categoryText = transaction.category?.toLowerCase() || '';

    const matchesSearch =
      !searchText ||
      categoryText.includes(searchText) ||
      noteText.includes(searchText);

    const matchesType =
      filters.type === 'all' || transaction.type === filters.type;

    const matchesCategory =
      filters.category === 'all' || transaction.category === filters.category;

    const matchesStartDate =
      !filters.startDate || transaction.date >= filters.startDate;

    const matchesEndDate =
      !filters.endDate || transaction.date <= filters.endDate;

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesStartDate &&
      matchesEndDate
    );
  });
}

export function getCategoryBreakdown(transactions) {
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  const breakdownMap = expenseTransactions.reduce((acc, transaction) => {
    acc[transaction.category] =
      (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  return Object.entries(breakdownMap)
    .map(([category, total]) => ({
      category,
      total,
    }))
    .sort((a, b) => b.total - a.total);
}

export function getMonthlyExpenseData(transactions) {
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  const monthlyMap = expenseTransactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString('en-US', { month: 'short' });

    acc[month] = (acc[month] || 0) + transaction.amount;
    return acc;
  }, {});

  return Object.entries(monthlyMap).map(([month, expenses]) => ({
    month,
    expenses,
  }));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString) {
  if (!dateString) return '';

  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      category: 'all',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="card glass-card">
      <div className="section-header">
        <h2>Filters</h2>
        <p>Search and narrow down transactions</p>
      </div>

      <div className="filters-grid advanced-filters-grid">
        <label>
          Search
          <input
            type="text"
            name="search"
            placeholder="Search by category or note"
            value={filters.search}
            onChange={handleChange}
          />
        </label>

        <label>
          Type
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Category
          <select name="category" value={filters.category} onChange={handleChange}>
            <option value="all">All</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Bonus">Bonus</option>
            <option value="Investment">Investment</option>
            <option value="Health">Health</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Start Date
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
          />
        </label>

        <label>
          End Date
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
          />
        </label>
      </div>

      <button className="secondary-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
}

export default Filters;
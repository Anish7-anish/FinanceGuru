import React from 'react';
import './Dashboard.css';
import Header from './Header';

function Dashboard() {
  return (
    <div>
      {/* Include the Header at the top */}
      <Header />

      {/* Dashboard content */}
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        <div className="dashboard-overview">
          <div className="total-balance">
            <h2>Total Balance</h2>
            <p>$12,345.67</p>
          </div>
          <div className="monthly-overview">
            <h2>Monthly Overview</h2>
            <p>Income: $5,000</p>
            <p>Expenses: $3,000</p>
            <p>Net Savings: $2,000</p>
          </div>
          <div className="upcoming-bills">
            <h2>Upcoming Bills</h2>
            <ul>
              <li>Rent - $1,200 due on 5th</li>
              <li>Internet - $50 due on 10th</li>
              <li>Utilities - $150 due on 15th</li>
            </ul>
          </div>
        </div>

        <div className="accounts-summary">
          <h2>Accounts Summary</h2>
          <ul>
            <li>Checking Account - $5,000</li>
            <li>Savings Account - $7,000</li>
            <li>Credit Card - $-1,000</li>
          </ul>
        </div>

        <div className="recent-transactions">
          <h2>Recent Transactions</h2>
          <ul>
            <li>Groceries - $150 on 1st</li>
            <li>Salary - $5,000 on 1st</li>
            <li>Utilities - $100 on 2nd</li>
          </ul>
        </div>

        <div className="budget-overview">
          <h2>Budget Overview</h2>
          <p>Groceries: $300 / $500</p>
          <p>Entertainment: $100 / $200</p>
          <p>Rent: $1,200 / $1,200</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

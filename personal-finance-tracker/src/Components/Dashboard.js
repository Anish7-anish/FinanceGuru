import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Header from './Header';

function Dashboard() {
  const navigate = useNavigate();

  // Single function to handle navigation
  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div>
      {/* Include the Header at the top */}
      <Header />

      {/* Dashboard content */}
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        <div className="button-container">
          <button onClick={() => handleNavigation('/user')}>Your Profile</button>
          <button onClick={() => handleNavigation('/transactions')}>Transactions</button>
          <button onClick={() => handleNavigation('/transactions')}>Balance</button>
          <button onClick={() => handleNavigation('/transactions')}>Accounts</button>
          <button onClick={() => handleNavigation('/transactions')}>Monthly Overview</button>
          <button onClick={() => handleNavigation('/transactions')}>Upcoming Bills</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

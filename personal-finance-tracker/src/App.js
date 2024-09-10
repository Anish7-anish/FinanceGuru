import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './Components/Authpage';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './PrivateRoute';
import Transactions from './Components/Transactions';
import Profile from './Components/Profile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/transactions" 
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/user" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;

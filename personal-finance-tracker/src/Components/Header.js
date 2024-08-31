import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleHeadingClick = () => {
    navigate("/dashboard");
  };

  const isAuthPage = location.pathname === "/";

  return (
    <header className="header">
      <h1 onClick={handleHeadingClick} className="header-heading">FinanceGuru</h1>
      {!isAuthPage && (
      <button className="header-button" onClick={handleLogout}>
        Log Out
      </button>
      )}
    </header>
  );
};

export default Header;

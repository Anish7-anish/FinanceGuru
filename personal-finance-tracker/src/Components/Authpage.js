import React, { useState } from 'react';
import axios from 'axios';
import './Authpage.css';
import { useNavigate } from 'react-router-dom';


function AuthPage() {
  const navigate = useNavigate();
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', {
        username,
        email,
        password,
      });
      if (response && response.data) {
        alert(response.data);  // Success message
      } else {
        alert('Signup successful, but no response data returned.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert('Error registering user: ' + error.response.data);  // Error message from the backend
      } else {
        alert('Error registering user: ' + error.message);
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        username,
        password,
      });
      if (response && response.data) {
        // alert(response.data); // Success message
        navigate('/dashboard');
      } else {
        alert('Login successful, but no response data returned.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert('Error logging in: ' + error.response.data);  // Error message from the backend
      } else {
        alert('Error logging in: ' + error.message);
      }
    }
  };

  return (
    <div className={`container ${isSignUpActive ? "right-panel-active" : ""}`} id="container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignupSubmit}>
          <h1>Create Account</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleLoginSubmit}>
          <h1>Sign in</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

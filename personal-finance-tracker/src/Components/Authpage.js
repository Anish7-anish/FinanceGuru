import React, { useState } from 'react';
import axios from 'axios';
import './Authpage.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function AuthPage() {
  const navigate = useNavigate();
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState(''); // State to hold the message

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
    setMessage(''); // Clear message when switching panels
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
    setMessage(''); // Clear message when switching panels
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
        setMessage(response.data);  // Set the success message
        // Clear the input fields
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setMessage('Signup successful, but no response data returned.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage('Error registering user: ' + error.response.data);  // Display the error message from the backend
      } else {
        setMessage('Error registering user: ' + error.message);
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
            console.log("Response from backend:", response.data); // Log the entire response
            const userId = response.data.userId;
            console.log("Extracted userId:", userId);

            if (userId) {
                localStorage.setItem("userId", userId); // Store userId in localStorage
                localStorage.setItem("isLoggedIn", "true");
                navigate('/dashboard');
            } else {
                setMessage('Login successful, but no userId returned.');
            }
        } else {
            setMessage('Login successful, but no response data returned.');
        }
    } catch (error) {
      if (error.response) {
          if (error.response.status === 401) {
              setMessage('Wrong username or password.');
          } else {
              setMessage('Error logging in: ' + error.response.data);
          }
      } else {
          setMessage('Error logging in: ' + error.message);
      }
  }
};


  return (
    <div>
      <Header />
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
            {message && <p className="message">{message}</p>} {/* Display the message */}
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
            {message && <p className="message">{message}</p>} {/* Display the message */}
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
              <h1>Register!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

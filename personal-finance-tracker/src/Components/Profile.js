import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Header from './Header';

function Profile() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    // Fetch user data from backend (Assuming the user ID is stored in localStorage)
    const userId = localStorage.getItem('userId');
    console.log("Retrieved userId from localStorage:", userId);

    // Hardcoding the credentials for now
    const basicAuth = 'Basic ' + btoa('user:password');  // Adjusted for your backend setup

    axios.get(`http://localhost:8080/api/users/${userId}`, {
      headers: {
        'Authorization': basicAuth
      }
    })
    .then(response => {
      setUserData(response.data);
      setFormData({
        username: response.data.username,
        email: response.data.email,
        currentPassword: '',
        newPassword: '',
      });
    })
    .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      username: userData.username,
      email: userData.email,
      currentPassword: '',
      newPassword: '',
    });
  };

  const handleSaveClick = () => {
    const userId = localStorage.getItem('userId');

    const basicAuth = 'Basic ' + btoa('user:password');  // Adjusted for your backend setup

    // If the user is changing the password, validate the current password
    if (formData.newPassword) {
      axios.post(`http://localhost:8080/api/users/validate-password`, {
        userId,
        password: formData.currentPassword
      }, {
        headers: {
          'Authorization': basicAuth
        }
      })
      .then(() => {
        // If the current password is valid, proceed with the update
        updateUserDetails(userId, basicAuth);
      })
      .catch(error => {
        console.error('Invalid current password:', error);
        alert('Current password is incorrect.');
      });
    } else {
      updateUserDetails(userId, basicAuth);
    }
  };

  const updateUserDetails = (userId, basicAuth) => {
    axios.put(`http://localhost:8080/api/users/${userId}`, {
      username: formData.username,
      email: formData.email,
      password: formData.newPassword ? formData.newPassword : null,
    }, {
      headers: {
        'Authorization': basicAuth
      }
    })
    .then(response => {
      setUserData(response.data);
      setIsEditing(false);
      alert('Profile updated successfully');
    })
    .catch(error => console.error('Error updating profile:', error));
  };

  const handleDeleteClick = () => {
    const userId = localStorage.getItem('userId');

    const basicAuth = 'Basic ' + btoa('user:password');  // Adjusted for your backend setup

    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      axios.delete(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          'Authorization': basicAuth
        }
      })
      .then(() => {
        alert('Account deleted successfully');
        localStorage.removeItem('userId');
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/';
      })
      .catch(error => console.error('Error deleting account:', error));
    }
  };

  const maskPassword = (password) => {
    return '*'.repeat(password.length);
  };

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <h1>User Profile</h1>
        <table className="profile-table">
          <tbody>
            <tr>
              <th>Username:</th>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.username
                )}
              </td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.email
                )}
              </td>
            </tr>
            <tr>
              <th>Password:</th>
              <td>
                {isEditing ? (
                  <>
                    <input
                      type="password"
                      name="currentPassword"
                      placeholder="Current Password"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                    />
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  maskPassword(userData.password || '********')
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          {isEditing ? (
            <>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={handleEditClick}>Edit Profile</button>
              <button onClick={handleDeleteClick}>Delete Account</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

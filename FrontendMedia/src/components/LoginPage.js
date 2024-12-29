// components/Login.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import './LoginPage.css'; // Import external CSS for styling

const Login = ({onLoginSuccess}) => {
  

  const handleFailure = () => {
    toast.error('Google login failed. Please try again.', { toastId: 'googleError' });
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Welcome to Media App</h2>
          <p className="login-subtitle">Login to continue</p>
          <div className="google-button">
            <GoogleLogin onSuccess={onLoginSuccess} onError={handleFailure} />
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;



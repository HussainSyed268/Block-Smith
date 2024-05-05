import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user is not empty, meaning user is authenticated
  if (!user) {
    // Redirect to login page
    navigate('/login');
    // Render nothing while redirecting
    return null;
  }

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {user && (
        <div>
          <p>Name: {user.firstName} {user.lastName}</p>
          <p>Email: {user.email}</p>
          {/* Add more user details as needed */}
        </div>
      )}
    </div>
  );
};

export default HomePage;

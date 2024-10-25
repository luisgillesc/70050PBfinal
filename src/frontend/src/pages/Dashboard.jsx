import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }

    fetchUser();
  }, []);

  return (
    <div className="container mx-auto p-8">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.first_name}!</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import AddFoodForm from '../components/AddFoodForm';
import DonorFoodCard from '../components/DonorFoodCard';
import './DonorDashboard.css';

function DonorDashboard() {
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. We've extracted the data fetching into its own function.
  // This allows us to call it whenever we need to refresh the list.
  const fetchMyItems = async () => {
    setLoading(true);
    const token = localStorage.getItem('firebaseToken');
    if (!token) {
      setError('You must be logged in to view your items.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/donor/my_items', {
        headers: { 'Authorization': token }
      });
      if (!response.ok) throw new Error('Failed to fetch your donations.');
      
      const data = await response.json();
      setMyItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. useEffect now calls our reusable function when the component first loads.
  useEffect(() => {
    fetchMyItems();
  }, []);

  return (
    <div className="donor-dashboard-container">
      <div className="dashboard-content">
        <div className="form-section">
          <h2>Post a New Donation</h2>
          <p>Fill out the details below to make your food available to NGOs.</p>
          
          {/* 3. THIS IS THE KEY CHANGE */}
          {/* We are passing the fetchMyItems function down to the form as a prop. */}
          <AddFoodForm onDonationPosted={fetchMyItems} />

        </div>
        <div className="list-section">
          <h2>My Active Donations</h2>
          <div className="donor-items-list">
            {loading && <p>Loading your items...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && myItems.length === 0 && (
              <p className="placeholder-text">You haven't posted any items yet.</p>
            )}
            {!loading && !error && myItems.map(item => (
              <DonorFoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;


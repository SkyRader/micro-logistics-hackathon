import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import FoodCard from '../components/FoodCard';
import './NGODashboard.css';

function NGODashboard() {
  const [availableItems, setAvailableItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableItems = async () => {
      const token = localStorage.getItem('firebaseToken');
      if (!token) {
        setError('No authorization token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/ngo/available', {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data. You may not have the correct role.');
        }

        const data = await response.json();
        setAvailableItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableItems();
  }, []);

  const handleClaimItem = async (foodId) => {
    const token = localStorage.getItem('firebaseToken');
    try {
      const response = await fetch(`http://localhost:5000/ngo/claim/${foodId}`, {
        method: 'POST',
        headers: {
          'Authorization': token,
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to claim item.');
      }
      
      alert('Item claimed successfully!');
      
      // Remove the claimed item from the list for immediate UI feedback
      setAvailableItems(prevItems => prevItems.filter(item => item.id !== foodId));

    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };


  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Available Donations</h1>
        <div className="header-actions">
          <button className="filter-button">Filters</button>
          {/* This Link tag correctly navigates to the My Claims page */}
          <Link to="/my-claims" className="claims-link">My Claims</Link>
        </div>
      </div>

      <div className="food-list">
        {loading && <p>Loading available items...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && availableItems.length === 0 && (
          <p>No available donations at the moment. Check back later!</p>
        )}
        {!loading && !error && availableItems.map(item => (
          <FoodCard 
            key={item.id} 
            item={item}
            onClaim={handleClaimItem} 
          />
        ))}
      </div>
    </div>
  );
}

export default NGODashboard;


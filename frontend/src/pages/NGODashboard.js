import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import './NGODashboard.css';

function NGODashboard() {
  const [availableItems, setAvailableItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 1. New state to track the current filter. 'All' is the default.
  const [activeFilter, setActiveFilter] = useState('All');

  // 2. useEffect will now re-run whenever 'activeFilter' changes.
  useEffect(() => {
    const fetchAvailableItems = async () => {
      setLoading(true); // Show loading indicator on each filter change
      const token = localStorage.getItem('firebaseToken');
      if (!token) {
        setError('No authorization token found. Please log in again.');
        setLoading(false);
        return;
      }

      // 3. Construct the URL with the filter if it's not 'All'
      let url = 'http://localhost:5000/ngo/available';
      if (activeFilter !== 'All') {
        url += `?category=${activeFilter}`;
      }

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Authorization': token },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
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
  }, [activeFilter]); // The effect depends on activeFilter now

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
      
      // A simple way to refresh the list is to briefly change the filter
      const currentFilter = activeFilter;
      setActiveFilter(''); // This change will trigger the useEffect
      setTimeout(() => setActiveFilter(currentFilter), 10); // Change it back

    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Available Donations</h1>
        <div className="header-actions">
          {/* 4. Filter buttons replace the old static button */}
          <div className="filter-controls">
            <button 
              className={`filter-button ${activeFilter === 'All' ? 'active-filter' : ''}`}
              onClick={() => setActiveFilter('All')}
            >
              All
            </button>
            <button 
              className={`filter-button ${activeFilter === 'Veg' ? 'active-filter' : ''}`}
              onClick={() => setActiveFilter('Veg')}
            >
              Veg
            </button>
            <button 
              className={`filter-button ${activeFilter === 'Non-Veg' ? 'active-filter' : ''}`}
              onClick={() => setActiveFilter('Non-Veg')}
            >
              Non-Veg
            </button>
          </div>
          <Link to="/my-claims" className="claims-link">My Claims</Link>
        </div>
      </div>

      <div className="food-list">
        {loading && <p>Loading available items...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && availableItems.length === 0 && (
          <p>No donations found for the "{activeFilter}" category.</p>
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


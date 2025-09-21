import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard'; // Import our new FoodCard component
import './NGODashboard.css'; 

function NGODashboard() {
  const [availableItems, setAvailableItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This function runs once when the component is first rendered
  useEffect(() => {
    const fetchAvailableItems = async () => {
      // Get the token from storage, which was saved during login
      const token = localStorage.getItem('firebaseToken');
      
      if (!token) {
        setError('Authorization token not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        // Fetch data from the backend endpoint
        const response = await fetch('http://localhost:5000/ngo/available', {
          method: 'GET',
          headers: {
            'Authorization': token, // Send the token for verification
          },
        });

        if (!response.ok) {
          // If the server responds with an error (like 403 Forbidden)
          throw new Error('Failed to fetch data. You may not have the correct role.');
        }

        const data = await response.json();
        setAvailableItems(data); // Store the fetched items in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop showing the loading message
      }
    };

    fetchAvailableItems();
  }, []); // The empty array ensures this effect runs only once

  // This function will be passed to the FoodCard to handle the claim button click
  const handleClaimItem = async (foodId) => {
    const token = localStorage.getItem('firebaseToken');
    console.log(`Attempting to claim item with ID: ${foodId}`);
    
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
      
      // For instant feedback, remove the claimed item from the dashboard view
      setAvailableItems(prevItems => prevItems.filter(item => item.id !== foodId));

    } catch (err) {
      alert(`Error: ${err.message}`);
      console.error("Claiming failed:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="header-title">Available Donations</h1>
        <div className="header-actions">
          <button className="filter-button">Filters</button>
          <a href="#claims" className="claims-link">My Claims</a>
        </div>
      </div>

      <div className="food-list-container">
        {loading && <p className="status-message">Loading donations...</p>}
        {error && <p className="status-message error">{error}</p>}
        
        {!loading && !error && availableItems.length === 0 && (
          <p className="status-message">No available donations at the moment. Please check back later!</p>
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

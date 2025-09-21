import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClaimedFoodCard from '../components/ClaimedFoodCard';
import './MyClaims.css'; // We'll create this CSS

function MyClaims() {
  const [claimedItems, setClaimedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchClaims = async () => {
    const token = localStorage.getItem('firebaseToken');
    if (!token) {
      setError('You must be logged in.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/ngo/my_claims', {
        headers: { 'Authorization': token }
      });
      if (!response.ok) throw new Error('Failed to fetch claims.');
      const data = await response.json();
      setClaimedItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleMarkDelivered = async (foodId) => {
    const token = localStorage.getItem('firebaseToken');
    try {
      const response = await fetch(`http://localhost:5000/ngo/deliver/${foodId}`, {
        method: 'POST',
        headers: { 'Authorization': token }
      });
      if (!response.ok) throw new Error('Failed to mark as delivered.');

      // Refresh the list to show the updated status
      fetchClaims(); 

    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="my-claims-container">
      <div className="claims-header">
        <h1>My Claimed Donations</h1>
        <Link to="/ngo-dashboard" className="back-link">
          &larr; Back to Available Donations
        </Link>
      </div>
      <div className="claims-list">
        {loading && <p>Loading your claims...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && claimedItems.length === 0 && (
          <p className="placeholder-text">You haven't claimed any items yet.</p>
        )}
        {!loading && !error && claimedItems.map(item => (
          <ClaimedFoodCard 
            key={item.id} 
            item={item} 
            onMarkDelivered={handleMarkDelivered} 
          />
        ))}
      </div>
    </div>
  );
}

export default MyClaims;

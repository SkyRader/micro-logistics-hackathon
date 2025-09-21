import React from 'react';
import './FoodCard.css';

function FoodCard({ item, onClaim }) {
  // A helper to format the date. Handles missing dates gracefully.
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    // Returns date in a simple format like "Sep 22, 2025"
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="food-card">
      <h3 className="item-name">{item.title || 'Untitled Item'}</h3>
      <p className="provider-name">Provider: {item.donorId || 'Unknown'}</p>
      <p className="item-qty">Qty: {item.quantity || 0}</p>
      <p className="item-description">{item.description || 'No description provided.'}</p>
      <p className="item-expiry">Expiry: {formatDate(item.expiryDate)}</p>
      <p className="item-location">Location: {item.location || 'Not specified'}</p>
      <button 
        className="claim-button" 
        onClick={() => onClaim(item.id)}
      >
        Place Order
      </button>
    </div>
  );
}

export default FoodCard;

import React from 'react';
import './FoodCard.css';

function FoodCard({ item, onClaim }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    // 1. Conditionally add the 'urgent-card' class if item.isUrgent is true
    <div className={`food-card ${item.isUrgent ? 'urgent-card' : ''}`}>
      <div className="card-header">
        <h3 className="item-name">{item.title || 'Untitled Item'}</h3>
        <span className="item-qty">Qty: {item.quantity || 0}</span>
      </div>

      <p className="item-description">{item.description || 'No description available.'}</p>
      
      <div className="card-footer">
        <div className="footer-info">
          <span className="item-expiry">Expires: {formatDate(item.expiryDate)}</span>
          <span className="item-location">Location: {item.location || 'Unknown'}</span>
        </div>
        <div className="footer-actions">
          {/* 2. Conditionally render the 'Expires Soon!' tag */}
          {item.isUrgent && <span className="urgent-tag">Expires Soon!</span>}
          <button 
            className="claim-button" 
            onClick={() => onClaim(item.id)}
          >
            Claim Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;


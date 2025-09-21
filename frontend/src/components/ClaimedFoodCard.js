import React from 'react';
import './ClaimedFoodCard.css'; // We'll create this CSS next

function ClaimedFoodCard({ item, onMarkDelivered }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={`claimed-food-card ${item.status === 'Delivered' ? 'is-delivered' : ''}`}>
      <div className="card-content">
        <h4>{item.title}</h4>
        <p><strong>Quantity:</strong> {item.quantity}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Expires:</strong> {formatDate(item.expiryDate)}</p>
        <p className="donor-id">
          <strong>Provider ID:</strong> ...{item.donorId.slice(-6)}
        </p>
      </div>
      <div className="card-action">
        {item.status === 'Claimed' ? (
          <button 
            className="deliver-button"
            onClick={() => onMarkDelivered(item.id)}
          >
            Mark as Delivered
          </button>
        ) : (
          <p className="delivered-status">✓ Delivered</p>
        )}
      </div>
    </div>
  );
}

export default ClaimedFoodCard;

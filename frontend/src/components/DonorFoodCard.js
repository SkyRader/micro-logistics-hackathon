import React from 'react';
import './DonorFoodCard.css'; // We will create this CSS file next

// A small, reusable component for the status badge
const StatusBadge = ({ status }) => {
  // Return a CSS class based on the status value
  const getStatusClass = () => {
    switch (status) {
      case 'Available':
        return 'status-available';
      case 'Claimed':
        return 'status-claimed';
      case 'Delivered':
        return 'status-delivered';
      default:
        return '';
    }
  };

  return <div className={`status-badge ${getStatusClass()}`}>{status}</div>;
};


function DonorFoodCard({ item }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="donor-food-card">
      <div className="card-header">
        <h4 className="item-title">{item.title || 'Untitled Item'}</h4>
        <StatusBadge status={item.status} />
      </div>
      <p className="item-info"><strong>Quantity:</strong> {item.quantity || 0}</p>
      <p className="item-info"><strong>Expires on:</strong> {formatDate(item.expiryDate)}</p>
      <p className="item-info"><strong>Location:</strong> {item.location || 'Unknown'}</p>
      {item.claimedBy && (
        <p className="claimed-by-info">
          <strong>Claimed by:</strong> User ID ending in ...{item.claimedBy.slice(-6)}
        </p>
      )}
    </div>
  );
}

export default DonorFoodCard;
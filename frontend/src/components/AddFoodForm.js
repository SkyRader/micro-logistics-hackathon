import React, { useState } from 'react';
import './AddFoodForm.css';

function AddFoodForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    expiryDate: '',
    location: '',
  });
  const [message, setMessage] = useState(''); // To show success/error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('firebaseToken');

    if (!token) {
      setMessage('Error: You are not logged in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/donor/add_food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit donation. Please try again.');
      }
      
      setMessage('Donation posted successfully!');
      // Clear the form after successful submission
      setFormData({
        title: '',
        description: '',
        quantity: '',
        expiryDate: '',
        location: '',
      });

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form className="add-food-form" onSubmit={handleSubmit}>
      {message && <p className={`form-message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      
      <label htmlFor="title">Item Name</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g., Loaf of Bread"
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="e.g., Freshly baked whole wheat bread"
        required
      />

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g., 10 packs"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <label htmlFor="location">Location / Address</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="e.g., 123 Main St, Anytown"
        required
      />
      
      <button type="submit" className="submit-button">Post Donation</button>
    </form>
  );
}

export default AddFoodForm;

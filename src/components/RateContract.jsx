import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RateContract = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rental = location.state?.rental;

  // Initialize state to hold ratings
  const [ratings, setRatings] = useState({
    fairPricing: 10,
    transparency: 10,
    maintenanceResponsiveness: 10,
    tenantSupport: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatings({
      ...ratings,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // After submission, navigate back to the payment confirmation or any other page
    alert("Ratings submitted successfully!");
    navigate("/payment-confirmation", { state: { rental, ratings } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Rate Your Rental Agreement</h1>

        {rental && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Rental Details</h2>
            <p><strong>Type:</strong> {rental.type}</p>
            <p><strong>Address:</strong> {rental.address}</p>
            <p><strong>Price:</strong> ₹{rental.price}</p>
          </div>
        )}

        <div className="mt-6">
          <label className="block text-lg font-semibold text-gray-700">Fair Pricing</label>
          <input
            type="number"
            name="fairPricing"
            value={ratings.fairPricing}
            onChange={handleChange}
            min="0"
            max="10"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-lg font-semibold text-gray-700">Transparency</label>
          <input
            type="number"
            name="transparency"
            value={ratings.transparency}
            onChange={handleChange}
            min="0"
            max="10"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-lg font-semibold text-gray-700">Maintenance Responsiveness</label>
          <input
            type="number"
            name="maintenanceResponsiveness"
            value={ratings.maintenanceResponsiveness}
            onChange={handleChange}
            min="0"
            max="10"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-lg font-semibold text-gray-700">Tenant Support</label>
          <input
            type="number"
            name="tenantSupport"
            value={ratings.tenantSupport}
            onChange={handleChange}
            min="0"
            max="10"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg"
          >
            Submit Ratings
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateContract;

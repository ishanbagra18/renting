import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Proceedtopay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rental = location.state?.rental;

  const handleCompletePayment = () => {
    // Navigate to RateContract page to submit ratings
    navigate("/rate-contract", { state: { rental } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Proceed to Payment</h1>

        {rental && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Rental Details</h2>
            <p><strong>Type:</strong> {rental.type}</p>
            <p><strong>Address:</strong> {rental.address}</p>
            <p><strong>Price:</strong> ₹{rental.price}</p>

            <div className="mt-6">
              <button
                onClick={handleCompletePayment}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-lg mr-4"
              >
                Complete Payment
              </button>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proceedtopay;

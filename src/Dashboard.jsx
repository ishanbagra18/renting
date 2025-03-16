import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-300 to-pink-400">
      {/* Heading Section */}
      <div className="flex justify-center items-center py-6 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white bg-gradient-to-r from-purple-700 to-pink-500 px-6 py-3 rounded-2xl shadow-lg animate-pulse text-center">
          Welcome to SafeRent 🏡
        </h1>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-purple-800 text-white p-6 flex flex-col shadow-lg">
          <button
            className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:from-purple-700 hover:to-pink-600 transition duration-300 focus:ring-2 focus:ring-pink-400"
            onClick={toggleProfile}
          >
            Profile
          </button>
          {showProfile && (
            <div className="mt-6 p-4 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-300">
              <h2 className="text-xl font-bold text-purple-800">Personal Information</h2>
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> johndoe@example.com</p>
              <p><strong>Phone:</strong> +1234567890</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-6">
          {/* Question Section */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full md:w-1/2 border border-gray-300 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Do you want to rent or lease rent?
            </h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button 
                className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-400 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-500 transition duration-300 focus:ring-2 focus:ring-pink-400"
                onClick={() => navigate("/tenant")}
              >
                rent
              </button>
              <button 
                className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-red-500 transition duration-300 focus:ring-2 focus:ring-pink-400"
                onClick={() => navigate("/landlord")}
              >
                lease rent
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="house2.png"
              alt="Dashboard Visual"
              className="w-full max-w-xs md:max-w-md h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

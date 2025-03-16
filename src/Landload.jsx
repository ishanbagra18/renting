import React, { useState } from "react";

const Landlord = () => {
  const [properties, setProperties] = useState([
    { id: 1, name: "Sunset Villa", type: "Rental House", location: "Los Angeles, CA", price: "$1200/month", isAvailable: true },
    { id: 2, name: "Luxury Apartment", type: "Apartment", location: "New York, NY", price: "$1500/month", isAvailable: false },
    { id: 3, name: "Tesla Model S", type: "Car", location: "San Francisco, CA", price: "$800/month", isAvailable: true },
    { id: 4, name: "Cozy Cottage", type: "Rental House", location: "Seattle, WA", price: "$900/month", isAvailable: true },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    type: "",
    location: "",
    price: "",
    isAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleAddProperty = (e) => {
    e.preventDefault();
    if (!newProperty.name || !newProperty.type || !newProperty.location || !newProperty.price) {
      alert("Please fill in all fields.");
      return;
    }

    setProperties([...properties, { id: properties.length + 1, ...newProperty }]);
    setShowForm(false);
    setNewProperty({ name: "", type: "", location: "", price: "", isAvailable: true });
  };

  return (
    <div className="min-h-screen bg-pink-100 p-4 sm:p-8 flex flex-col items-center relative">
      <h1 className="text-3xl sm:text-5xl font-bold text-pink-800 mb-6 text-center">Land with No Issue</h1>

      <button 
        className="absolute top-6 right-6 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add Properties"}
      </button>

      <div className="w-full flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-4">My properties</h2>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
              <thead>
                <tr className="bg-pink-200">
                  <th className="border border-gray-300 p-2 sm:p-3">Property Name</th>
                  <th className="border border-gray-300 p-2 sm:p-3">Type</th>
                  <th className="border border-gray-300 p-2 sm:p-3">Location</th>
                  <th className="border border-gray-300 p-2 sm:p-3">Price</th>
                  <th className="border border-gray-300 p-2 sm:p-3">Availability</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="text-center">
                    <td className="border border-gray-300 p-2 sm:p-3">{property.name}</td>
                    <td className="border border-gray-300 p-2 sm:p-3">{property.type}</td>
                    <td className="border border-gray-300 p-2 sm:p-3">{property.location}</td>
                    <td className="border border-gray-300 p-2 sm:p-3">{property.price}</td>
                    <td className={`border border-gray-300 p-2 sm:p-3 ${property.isAvailable ? "text-green-600" : "text-red-600"}`}>
                      {property.isAvailable ? "Available" : "Not Available"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showForm && (
            <form onSubmit={handleAddProperty} className="mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-pink-700">Add New Property</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Property Name" value={newProperty.name} onChange={handleChange} className="border p-2 rounded-md w-full" />
                <input type="text" name="type" placeholder="Type (Car, Apartment, etc.)" value={newProperty.type} onChange={handleChange} className="border p-2 rounded-md w-full" />
                <input type="text" name="location" placeholder="Location" value={newProperty.location} onChange={handleChange} className="border p-2 rounded-md w-full" />
                <input type="text" name="price" placeholder="Price (e.g., $1000/month)" value={newProperty.price} onChange={handleChange} className="border p-2 rounded-md w-full" />
              </div>
              <button type="submit" className="mt-4 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition w-full">
                Add Property
              </button>
            </form>
          )}
        </div>

        <div className="md:w-1/3 w-full flex items-center justify-center">
          <img src="https://i.pinimg.com/474x/c9/56/09/c95609567efa2985dc4a9e36f36d9213.jpg" alt="Decorative" className="w-full max-w-xs sm:max-w-sm md:max-w-full" />
        </div>
      </div>
    </div>
  );
};

export default Landlord;

import React, { useState } from "react";

const Tenant = () => {
  // Sample data for rental listings
  const rentalListings = [
    { type: "Car", landlord: "John Doe", address: "123 Main St, NY", phone: "+1234567890" },
    { type: "House", landlord: "Alice Smith", address: "456 Elm St, CA", phone: "+1987654321" },
    { type: "Property", landlord: "Robert Brown", address: "789 Oak St, TX", phone: "+1122334455" },
    { type: "Apartment", landlord: "Emily Davis", address: "101 Pine St, FL", phone: "+1567890345" },
    { type: "Office", landlord: "Michael Lee", address: "303 Cedar St, IL", phone: "+1654321098" },
    { type: "Shop", landlord: "Sophia Wilson", address: "505 Maple St, WA", phone: "+1987456321" },
  ];

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Filtered list based on search and selected rental type
  const filteredListings = rentalListings.filter((item) =>
    (selectedType === "" || item.type === selectedType) &&
    (searchQuery === "" || item.landlord.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">
        Rent with No Trust Issues
      </h1>

      {/* Search & Filter Options */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search landlord name..."
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Rental Type Filter */}
        <select
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Car">Car</option>
          <option value="House">House</option>
          <option value="Property">Property</option>
          <option value="Apartment">Apartment</option>
          <option value="Office">Office</option>
          <option value="Shop">Shop</option>
        </select>
      </div>

      {/* Rental Listings Table */}
      <div className="overflow-x-auto">
        <table className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Rental Type</th>
              <th className="py-3 px-4 text-left">Landlord Name</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.length > 0 ? (
              filteredListings.map((item, index) => (
                <tr key={index} className="border-b hover:bg-blue-50">
                  <td className="py-3 px-4">{item.type}</td>
                  <td className="py-3 px-4">{item.landlord}</td>
                  <td className="py-3 px-4">{item.address}</td>
                  <td className="py-3 px-4">{item.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tenant;

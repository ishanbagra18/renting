import React, { useState } from "react";

const Landlord = () => {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    type: "",
    location: { street: "", city: "", state: "", pincode: "" },
    price: "",
    description: "",
    images: [],
    legalDocs: [],
    rentPaid: false, // To track if rent is paid
    review: {
      timelinessOfRentPayment: 10,
      propertyCleanliness: 10,
      ruleCompliance: 10,
      respectForNeighbors: 10,
    },
  });
  const [modal, setModal] = useState({ show: false, fileUrl: "" });
  const [selectedPropertyId, setSelectedPropertyId] = useState(null); // Track selected property
  const [reviewData, setReviewData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const locationField = name.split(".")[1];
      setNewProperty({
        ...newProperty,
        location: { ...newProperty.location, [locationField]: value },
      });
    } else {
      setNewProperty({ ...newProperty, [name]: value });
    }
  };

  const handleFileUpload = (e, field) => {
    const files = Array.from(e.target.files);
    if (field === "images" && files.length < 3) {
      alert("Please upload at least three images.");
      return;
    }
    if (field === "legalDocs" && files.length > 1) {
      alert("Please upload only one legal document.");
      return;
    }
    setNewProperty({ ...newProperty, [field]: files });
  };

  const handleAddProperty = (e) => {
    e.preventDefault();
    if (
      !newProperty.name ||
      !newProperty.type ||
      !newProperty.location.street ||
      !newProperty.location.city ||
      !newProperty.location.state ||
      !newProperty.location.pincode ||
      !newProperty.price ||
      newProperty.images.length < 3 ||
      newProperty.legalDocs.length === 0 ||
      newProperty.description.length < 5
    ) {
      alert("Please fill in all fields, ensure at least three images, one legal document, and a minimum 15-word description.");
      return;
    }
    setProperties([...properties, { id: properties.length + 1, ...newProperty }]);
    setShowForm(false);
    setNewProperty({
      name: "",
      type: "",
      location: { street: "", city: "", state: "", pincode: "" },
      price: "",
      description: "",
      images: [],
      legalDocs: [],
      rentPaid: false,
      review: {
        timelinessOfRentPayment: 10,
        propertyCleanliness: 10,
        ruleCompliance: 10,
        respectForNeighbors: 10,
      },
    });
  };

  const handleModal = (fileUrl) => {
    setModal({ show: true, fileUrl });
  };

  const closeModal = () => {
    setModal({ show: false, fileUrl: "" });
  };

  const togglePropertyDetails = (id) => {
    setSelectedPropertyId((prevId) => (prevId === id ? null : id)); // Toggle between showing and hiding details for one property
  };

  // Toggle rent paid state
  const handleRentPaid = (id) => {
    const property = properties.find((property) => property.id === id);
    const confirmAction = window.confirm(
      property.rentPaid ? "Are you sure you want to mark rent as unpaid?" : "Are you sure you want to mark rent as paid?"
    );

    if (confirmAction) {
      const updatedProperties = properties.map((property) =>
        property.id === id ? { ...property, rentPaid: !property.rentPaid } : property
      );
      setProperties(updatedProperties);
    }
  };

  const handleReviewChange = (e, field) => {
    const value = e.target.value;
    setReviewData({ ...reviewData, [field]: value });
  };

  const handleSubmitReview = (id) => {
    const updatedProperties = properties.map((property) =>
      property.id === id ? { ...property, review: reviewData } : property
    );
    setProperties(updatedProperties);
    setReviewData({}); // Reset review data
  };

  return (
    <div className="min-h-screen bg-pink-100 p-4 sm:p-8 flex flex-col items-center relative">
      <h1 className="text-3xl sm:text-5xl font-bold text-pink-800 mb-6 text-center">Land with No Issue</h1>

      <button
        className="absolute top-6 right-6 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add Property"}
      </button>

      <div className="w-full mt-6 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-4">My Properties</h2>
        <div className="w-full flex flex-col items-center gap-6">
          {properties.length === 0 ? (
            <p className="text-center">No properties added yet. Click on "Add Property" to add a new one.</p>
          ) : (
            properties.map((property, idx) => (
              <div key={property.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                <h3
                  className="font-bold text-lg text-pink-700 mb-2 cursor-pointer"
                  onClick={() => togglePropertyDetails(property.id)} // Toggle details on click
                >
                  Property {idx + 1}: {property.name} ({property.type})
                </h3>

                {/* Conditionally render property details */}
                {selectedPropertyId === property.id && (
                  <div>
                    <p className="mb-2"><strong>Address:</strong> {property.location.street}, {property.location.city}, {property.location.state} - {property.location.pincode}</p>
                    <p className="font-semibold mb-2"><strong>Price:</strong> {property.price}</p>
                    <p className="mb-2"><strong>Description:</strong> {property.description}</p>

                    <div className="mb-2">
                      <strong>Images:</strong>
                      <div className="flex flex-wrap gap-4">
                        {property.images.map((img, idx) => (
                          <div key={idx} className="mt-1">
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`Image ${idx + 1}`}
                              className="w-32 h-32 object-cover rounded-lg border cursor-pointer transform hover:scale-105 transition duration-300"
                              onClick={() => handleModal(URL.createObjectURL(img))}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-2">
                      <strong>Legal Docs:</strong>
                      <div className="flex flex-wrap gap-4">
                        {property.legalDocs.map((doc, idx) => (
                          <div key={idx} className="mt-1">
                            <img
                              src={URL.createObjectURL(doc)}
                              alt={`Document ${idx + 1}`}
                              className="w-32 h-32 object-cover rounded-lg border cursor-pointer transform hover:scale-105 transition duration-300"
                              onClick={() => handleModal(URL.createObjectURL(doc))}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rent Payment Button */}
                    <button
                      onClick={() => handleRentPaid(property.id)}
                      className={`mt-4 px-4 py-2 font-semibold rounded-lg shadow-md transition ${
                        property.rentPaid ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                      } text-white`}
                    >
                      {property.rentPaid ? "Mark Rent as Unpaid" : "Mark Rent as Paid"}
                    </button>

                    {/* Review Form */}
                    {property.rentPaid && (
                      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                        <h4 className="text-xl text-pink-700 mb-4">Tenant Review</h4>
                        <div className="flex flex-col gap-4">
                          <label>
                            Timeliness of Rent Payment:
                            <input
                              type="number"
                              value={reviewData.timelinessOfRentPayment || property.review.timelinessOfRentPayment}
                              onChange={(e) => handleReviewChange(e, "timelinessOfRentPayment")}
                              min="0"
                              max="10"
                              className="border p-2 rounded-md w-full"
                            />
                          </label>
                          <label>
                            Property Cleanliness:
                            <input
                              type="number"
                              value={reviewData.propertyCleanliness || property.review.propertyCleanliness}
                              onChange={(e) => handleReviewChange(e, "propertyCleanliness")}
                              min="0"
                              max="10"
                              className="border p-2 rounded-md w-full"
                            />
                          </label>
                          <label>
                            Rule Compliance:
                            <input
                              type="number"
                              value={reviewData.ruleCompliance || property.review.ruleCompliance}
                              onChange={(e) => handleReviewChange(e, "ruleCompliance")}
                              min="0"
                              max="10"
                              className="border p-2 rounded-md w-full"
                            />
                          </label>
                          <label>
                            Respect for Neighbors:
                            <input
                              type="number"
                              value={reviewData.respectForNeighbors || property.review.respectForNeighbors}
                              onChange={(e) => handleReviewChange(e, "respectForNeighbors")}
                              min="0"
                              max="10"
                              className="border p-2 rounded-md w-full"
                            />
                          </label>

                          <button
                            onClick={() => handleSubmitReview(property.id)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {showForm && (
          <form onSubmit={handleAddProperty} className="mt-6 bg-white p-4 rounded-lg shadow-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-4">Add New Property</h2>
            {/* Form Fields */}
            <label className="block mb-2">
              Property Name:
              <input
                type="text"
                name="name"
                value={newProperty.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </label>

            <label className="block mb-2">
              Property Type:
              <input
                type="text"
                name="type"
                value={newProperty.type}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </label>

            <label className="block mb-2">
              Street:
              <input
                type="text"
                name="location.street"
                value={newProperty.location.street}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </label>

            <label className="block mb-2">
              City:
              <input
                type="text"
                name="location.city"
                value={newProperty.location.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </label>

            <label className="block mb-2">
              State:
              <input
                type="text"
                name="location.state"
                value={newProperty.location.state}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </label>

            <label className="block mb-2">
              Pincode:
              <input
                type="text"
                name="location.pincode"
                value={newProperty.location.pincode}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </label>

            <label className="block mb-2">
              Price:
              <input
                type="number"
                name="price"
                value={newProperty.price}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </label>

            <label className="block mb-2">
              Description:
              <textarea
                name="description"
                value={newProperty.description}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </label>

            <label className="block mb-2">
              Property Images (at least 3):
              <input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e, "images")}
                className="w-full p-2 border rounded-md"
                accept="image/*"
              />
            </label>

            <label className="block mb-2">
              Legal Documents (only 1):
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, "legalDocs")}
                className="w-full p-2 border rounded-md"
                accept=".pdf,.doc,.docx"
              />
            </label>

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Add Property
            </button>
          </form>
        )}
      </div>

      {modal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={modal.fileUrl}
              alt="Modal content"
              className="max-w-full max-h-96 object-contain"
            />
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landlord;

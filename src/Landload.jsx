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
  });
  const [modal, setModal] = useState({ show: false, fileUrl: "" });
  const [selectedPropertyId, setSelectedPropertyId] = useState(null); // Track selected property

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
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {showForm && (
          <form onSubmit={handleAddProperty} className="mt-6 bg-white p-4 rounded-lg shadow-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-pink-700">Add New Property</h2>
            <div className="flex flex-col gap-4">
              <input type="text" name="name" placeholder="Property Name" value={newProperty.name} onChange={handleChange} className="border p-2 rounded-md w-full" />
              <input type="text" name="type" placeholder="Type (Vehicle, House)" value={newProperty.type} onChange={handleChange} className="border p-2 rounded-md w-full" />
              <input type="text" name="location.street" placeholder="Street" value={newProperty.location.street} onChange={handleChange} className="border p-2 rounded-md w-full" />
              <input type="text" name="location.city" placeholder="City" value={newProperty.location.city} onChange={handleChange} className="border p-2 rounded-md w-full" />
              <input type="text" name="location.state" placeholder="State" value={newProperty.location.state} onChange={handleChange} className="border p-2 rounded-md w-full" />
              <input type="text" name="location.pincode" placeholder="Pincode" value={newProperty.location.pincode} onChange={handleChange} className="border p-2 rounded-md w-full" />
              <input type="text" name="price" placeholder="Price (e.g., $1000/month)" value={newProperty.price} onChange={handleChange} className="border p-2 rounded-md w-full" />
              <textarea name="description" placeholder="Property Description" value={newProperty.description} onChange={handleChange} className="border p-2 rounded-md w-full" minLength="15" required></textarea>
              <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, "images")} className="border p-2 rounded-md w-full" />
              <input type="file" multiple accept="application/pdf, image/jpeg, image/jpg" onChange={(e) => handleFileUpload(e, "legalDocs")} className="border p-2 rounded-md w-full" />
            </div>
            <button type="submit" className="mt-4 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition w-full">
              Add Property
            </button>
          </form>
        )}
      </div>

      {/* Modal for Image or Document Preview */}
      {modal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            {modal.fileUrl.endsWith(".pdf") ? (
              <iframe src={modal.fileUrl} width="100%" height="500px" title="Document Preview" />
            ) : (
              <img src={modal.fileUrl} alt="Property" className="w-full h-auto rounded-lg" />
            )}
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landlord;

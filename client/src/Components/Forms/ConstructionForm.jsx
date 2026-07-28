import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addConstruction } from "../../Services/ConstructionService";

const ConstructionForm = () => {
  const navigate = useNavigate();

  const [construction, setConstruction] = useState({
    vehicleName: "",
    vehicleNumber: "",
    workType: "",
    userName: "",
    contactNumber: "",
    location: "",
    description: "",
    status: "Available",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setConstruction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("userId", localStorage.getItem("userId"));
      formData.append("vehicleName", construction.vehicleName);
      formData.append("vehicleNumber", construction.vehicleNumber);
      formData.append("workType", construction.workType);
      formData.append("userName", construction.userName);
      formData.append("contactNumber", construction.contactNumber);
      formData.append("location", construction.location);
      formData.append("description", construction.description);
      formData.append("status", construction.status);

      if (image) {
        formData.append("image", image);
      }

      await addConstruction(formData);

      alert("Construction Vehicle Added Successfully");

      navigate("/construction");
    } catch (error) {
      console.error(error);
      alert("Failed to Add Construction Vehicle");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 shadow-xl rounded-xl p-8 space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-primary">
          Add Construction Vehicle
        </h2>

        <input
          type="text"
          name="vehicleName"
          placeholder="Vehicle Name"
          className="input input-bordered w-full"
          value={construction.vehicleName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          className="input input-bordered w-full"
          value={construction.vehicleNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="workType"
          placeholder="Work Type"
          className="input input-bordered w-full"
          value={construction.workType}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="userName"
          placeholder="Owner Name"
          className="input input-bordered w-full"
          value={construction.userName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          className="input input-bordered w-full"
          value={construction.contactNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="input input-bordered w-full"
          value={construction.location}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          rows="4"
          value={construction.description}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          className="select select-bordered w-full"
          value={construction.status}
          onChange={handleChange}
        >
          <option value="Available">Available</option>
          <option value="Busy">Busy</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <div>
          <label className="block mb-2 font-semibold">
            Vehicle Image (Optional)
          </label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-60 h-40 object-cover rounded-lg border mt-4"
            />
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-lg"
        >
          Add Construction Vehicle
        </button>
      </form>
    </div>
  );
};

export default ConstructionForm;
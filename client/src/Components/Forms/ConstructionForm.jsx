import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addConstruction } from "../../Services/ConstructionService";
import Swal from "sweetalert2";
import axios from "axios";

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
    paymentMethod: "UPI",
    paymentStatus: "Pending",
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
    const role = localStorage.getItem("role");
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

      formData.append("paymentMethod", construction.paymentMethod);
      formData.append("paymentStatus", "Pending");

      if (role === "Admin") {

        formData.set("paymentMethod", "Admin");
        formData.set("paymentStatus", "Success");
        formData.set("transactionId", "ADMIN-" + Date.now());

        await addConstruction(formData);

        Swal.fire({
          icon: "success",
          title: "Vehicle Added Successfully"
        });

        navigate("/construction");
        return;
      }

      const { data } = await axios.post(
        "https://localhost:7041/api/Payment/create-order",
        {
          amount: 99
        }
      );

      const options = {

        key: data.key,

        amount: data.amount,

        currency: data.currency,

        name: "DriveHub",

        description: "Construction Vehicle Payment",

        order_id: data.orderId,

        handler: async function (response) {

          formData.set(
            "transactionId",
            response.razorpay_payment_id
          );

          formData.set(
            "paymentStatus",
            "Success"
          );

          await addConstruction(formData);

          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Vehicle Added Successfully"
          });

          navigate("/construction");
        },

        modal: {

          ondismiss: function () {

            Swal.fire({
              icon: "warning",
              title: "Payment Cancelled"
            });

          }

        }

      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Unable to add construction vehicle. Please try again.",
      });
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
          placeholder="Location - Village , Taluka , District"
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

        {/* Payment Section */}
        {localStorage.getItem("role") !== "Admin" && (

          <div className="mt-8 border rounded-xl p-5 bg-gray-50 shadow">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>

            <div className="mb-3">
              <label className="font-medium">Amount</label>
              <input
                type="text"
                value="₹0 (Free Launch)"
                readOnly
                className="w-full border rounded-lg p-2 mt-1 bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="font-medium block mb-2">
                Select Payment Method
              </label>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={construction.paymentMethod === "UPI"}
                    onChange={handleChange}
                  />
                  UPI
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={construction.paymentMethod === "Card"}
                    onChange={handleChange}
                  />
                  Card
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Net Banking"
                    checked={construction.paymentMethod === "Net Banking"} onChange={handleChange}
                  />
                  Net Banking
                </label>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full text-lg"
        >
          {localStorage.getItem("role") === "Admin"
            ? "Add Vehicle"
            : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
};

export default ConstructionForm;
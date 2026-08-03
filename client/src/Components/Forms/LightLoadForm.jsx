import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLightLoad } from "../../Services/LightLoadService";
import Swal from "sweetalert2";
import axios from "axios";

const LightLoadForm = () => {
    const navigate = useNavigate();

    const [lightLoad, setLightLoad] = useState({
        vehicleName: "",
        vehicleNumber: "",
        category: "LightLoad",
        location: "",
        ownerName: "",
        ownerContact: "",
        loadCapacity: "",
        description: "",
        paymentMethod: "UPI",
        paymentStatus: "Pending",
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLightLoad({
            ...lightLoad,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        const role = localStorage.getItem("role");

        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("userId", localStorage.getItem("userId"));
            formData.append("vehicleName", lightLoad.vehicleName);
            formData.append("vehicleNumber", lightLoad.vehicleNumber);
            formData.append("category", lightLoad.category);
            formData.append("location", lightLoad.location);
            formData.append("ownerName", lightLoad.ownerName);
            formData.append("ownerContact", lightLoad.ownerContact);
            formData.append("loadCapacity", lightLoad.loadCapacity);
            formData.append("description", lightLoad.description);
            formData.append("paymentMethod", lightLoad.paymentMethod);
            formData.append("paymentStatus", "Pending");

            if (image) {
                formData.append("image", image);
            }

            if (role === "Admin") {

                formData.set("paymentMethod", "Admin");
                formData.set("paymentStatus", "Success");
                formData.set("transactionId", "ADMIN-" + Date.now());

                await addLightLoad(formData);

                Swal.fire({
                    icon: "success",
                    title: "Light Load Vehicle Added Successfully"
                });

                navigate("/lightload");
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
                description: "Light Load Vehicle Payment",
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

                    await addLightLoad(formData);

                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful",
                        text: "Light Load Vehicle Added Successfully"
                    });

                    navigate("/lightload");
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
                text: "Unable to add light load vehicle. Please try again.",
            });
        }
    };
    return (
        <div className="max-w-3xl mx-auto mt-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 space-y-4"
            >
                <h2 className="text-3xl font-bold text-center mb-4">
                    Add Light Load Vehicle
                </h2>

                <input
                    type="text"
                    name="vehicleName"
                    placeholder="Vehicle Name"
                    className="input input-bordered w-full"
                    value={lightLoad.vehicleName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    className="input input-bordered w-full"
                    value={lightLoad.vehicleNumber}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="input input-bordered w-full"
                    value={lightLoad.category}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location - Village , Taluka , District"
                    className="input input-bordered w-full"
                    value={lightLoad.location}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="ownerName"
                    placeholder="Owner Name"
                    className="input input-bordered w-full"
                    value={lightLoad.ownerName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="ownerContact"
                    placeholder="Owner Contact"
                    className="input input-bordered w-full"
                    value={lightLoad.ownerContact}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="loadCapacity"
                    placeholder="Load Capacity (Example: 1 Ton, 2 Ton)"
                    className="input input-bordered w-full"
                    value={lightLoad.loadCapacity}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Vehicle Description"
                    className="textarea textarea-bordered w-full"
                    value={lightLoad.description}
                    onChange={handleChange}
                />

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

                {localStorage.getItem("role") !== "Admin" && (
                    <div className="mt-8 border rounded-xl p-5 bg-gray-50 shadow">

                        <h2 className="text-xl font-semibold mb-4">
                            Payment
                        </h2>

                        <div className="mb-3">
                            <label className="font-medium">
                                Amount
                            </label>

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
                                        checked={lightLoad.paymentMethod === "UPI"}
                                        onChange={handleChange}
                                    />
                                    UPI
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Card"
                                        checked={lightLoad.paymentMethod === "Card"}
                                        onChange={handleChange}
                                    />
                                    Card
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Net Banking"
                                        checked={lightLoad.paymentMethod === "Net Banking"}
                                        onChange={handleChange}
                                    />
                                    Net Banking
                                </label>

                            </div>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    {localStorage.getItem("role") === "Admin"
                        ? "Add Vehicle"
                        : "Proceed to Payment"}
                </button>

            </form>
        </div>
    );
}

export default LightLoadForm;
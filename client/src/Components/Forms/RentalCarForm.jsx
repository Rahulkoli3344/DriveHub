import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRentalCar } from "../../Services/RentalCarService";
import Swal from "sweetalert2";
import axios from "axios";

const RentalCarForm = () => {
    const navigate = useNavigate();

    const [rentalCar, setRentalCar] = useState({
        vehicleName: "",
        vehicleNumber: "",
        category: "RentalCar",
        location: "",
        ownerName: "",
        ownerContact: "",
        seatingCapacity: 1,
        acAvailable: false,

        paymentMethod: "UPI",
        paymentStatus: "Pending",
    });

    const [image, setImage] = useState(null);


    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setRentalCar({
            ...rentalCar,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const role = localStorage.getItem("role");

        try {

            const formData = new FormData();

            formData.append("userId", localStorage.getItem("userId"));
            formData.append("vehicleName", rentalCar.vehicleName);
            formData.append("vehicleNumber", rentalCar.vehicleNumber);
            formData.append("category", rentalCar.category);
            formData.append("location", rentalCar.location);
            formData.append("ownerName", rentalCar.ownerName);
            formData.append("ownerContact", rentalCar.ownerContact);
            formData.append("seatingCapacity", rentalCar.seatingCapacity);
            formData.append("acAvailable", rentalCar.acAvailable);

            if (image) {
                formData.append("image", image);
            }

            formData.append("paymentMethod", rentalCar.paymentMethod);
            formData.append("paymentStatus", "Pending");


            // ================= ADMIN ==================

            if (role === "Admin") {

                formData.set("paymentMethod", "Admin");
                formData.set("paymentStatus", "Success");
                formData.set("transactionId", "ADMIN-" + Date.now());

                await addRentalCar(formData);

                Swal.fire({
                    icon: "success",
                    title: "Rental Car Added Successfully"
                });

                navigate("/rentalcars");
                return;
            }


            // =============== CREATE ORDER =================

            const { data } = await axios.post(
                "https://localhost:7041/api/Payment/create-order",
                {
                    amount: 99
                }
            );

            console.log("Order Response :", data);
            alert(JSON.stringify(data));

            const options = {

                key: data.key,

                amount: data.amount,

                currency: data.currency,

                name: "DriveHub",

                description: "Rental Car Payment",

                order_id: data.orderId,

                handler: async function (response) {

                    console.log("Payment Success :", response);

                    formData.set(
                        "transactionId",
                        response.razorpay_payment_id
                    );

                    formData.set(
                        "paymentStatus",
                        "Success"
                    );

                    await addRentalCar(formData);

                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful",
                        text: "Rental Car Added Successfully"
                    });

                    navigate("/rentalcars");
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

            console.log("Razorpay Options :", options);

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        }
        catch (error) {

            console.error("Payment Error :", error);

            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: error?.response?.data?.message || error.message
            });

        }
    };





    return (
        <div className="max-w-3xl mx-auto mt-8">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 space-y-4">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Add Rental Car
                </h2>

                <input
                    type="text"
                    name="vehicleName"
                    placeholder="Vehicle Name"
                    className="input input-bordered w-full"
                    value={rentalCar.vehicleName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    className="input input-bordered w-full"
                    value={rentalCar.vehicleNumber}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="input input-bordered w-full"
                    value={rentalCar.category}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location - Village , Taluka , District"
                    className="input input-bordered w-full"
                    value={rentalCar.location}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="ownerName"
                    placeholder="Owner Name"
                    className="input input-bordered w-full"
                    value={rentalCar.ownerName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="ownerContact"
                    placeholder="Owner Contact"
                    className="input input-bordered w-full"
                    value={rentalCar.ownerContact}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="seatingCapacity"
                    placeholder="Seating Capacity"
                    className="input input-bordered w-full"
                    value={rentalCar.seatingCapacity}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    required
                />

                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="acAvailable"
                        checked={rentalCar.acAvailable}
                        onChange={handleChange}
                    />
                    AC Available
                </label>

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
                                        checked={rentalCar.paymentMethod === "UPI"}
                                        onChange={handleChange}
                                    />
                                    UPI
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Card"
                                        checked={rentalCar.paymentMethod === "Card"}
                                        onChange={handleChange}
                                    />
                                    Card
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Net Banking"
                                        checked={rentalCar.paymentMethod === "Net Banking"}
                                        onChange={handleChange}
                                    />
                                    Net Banking
                                </label>

                            </div>
                        </div>
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-full">
                    {localStorage.getItem("role") === "Admin"
                        ? "Add Vehicle"
                        : "Proceed to Payment"}
                </button>

            </form>
        </div>
    );
};

export default RentalCarForm;
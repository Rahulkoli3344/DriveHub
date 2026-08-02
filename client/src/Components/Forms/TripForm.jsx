import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTrip } from "../../Services/TripService";
import Swal from "sweetalert2";

const TripForm = () => {
    const navigate = useNavigate();

    const [trip, setTrip] = useState({
        vehicleName: "",
        vehicleNumber: "",
        category: "",
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
        const { name, value, type, checked } = e.target;

        setTrip({
            ...trip,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("userId", localStorage.getItem("userId"));
            formData.append("vehicleName", trip.vehicleName);
            formData.append("vehicleNumber", trip.vehicleNumber);
            formData.append("category", trip.category);
            formData.append("location", trip.location);
            formData.append("ownerName", trip.ownerName);
            formData.append("ownerContact", trip.ownerContact);
            formData.append("seatingCapacity", trip.seatingCapacity);
            formData.append("acAvailable", trip.acAvailable);

            formData.append("paymentMethod", trip.paymentMethod);
            formData.append("paymentStatus", "Success");


            if (image) {
                formData.append("image", image);
            }

            const transactionId = "DRVHUB-" + Date.now();
            formData.set("transactionId", transactionId);

            Swal.fire({
                title: "Processing Payment...",
                text: "Please wait",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            await new Promise((resolve) => setTimeout(resolve, 2000));

            await addTrip(formData);

            await Swal.fire({
                icon: "success",
                title: "Payment Successful",
                html: `
    <b>Amount:</b> ₹0 (Free Launch)<br><br>
    <b>Transaction ID:</b><br>${transactionId}<br><br>
    <b>Your vehicle has been added successfully.</b>
  `,
                confirmButtonText: "Continue",
            });

            navigate("/trip");
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Unable to add trip. Please try again.",
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
                    Add Trip Vehicle
                </h2>

                <input
                    type="text"
                    name="vehicleName"
                    placeholder="Vehicle Name"
                    className="input input-bordered w-full"
                    value={trip.vehicleName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    className="input input-bordered w-full"
                    value={trip.vehicleNumber}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="input input-bordered w-full"
                    value={trip.category}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location - Village , Taluka , District"
                    className="input input-bordered w-full"
                    value={trip.location}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="ownerName"
                    placeholder="Owner Name"
                    className="input input-bordered w-full"
                    value={trip.ownerName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="ownerContact"
                    placeholder="Owner Contact"
                    className="input input-bordered w-full"
                    value={trip.ownerContact}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="seatingCapacity"
                    placeholder="Seating Capacity"
                    className="input input-bordered w-full"
                    value={trip.seatingCapacity}
                    onChange={handleChange}
                    min="1"
                    max="100"
                    required
                />

                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="acAvailable"
                        checked={trip.acAvailable}
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



                {/* Payment Section */}
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
                                    checked={trip.paymentMethod === "UPI"}
                                    onChange={handleChange}
                                />
                                UPI
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Card"
                                    checked={trip.paymentMethod === "Card"}
                                    onChange={handleChange}
                                />
                                Card
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Net Banking"
                                    checked={trip.paymentMethod === "Net Banking"} onChange={handleChange}
                                />
                                Net Banking
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Proceed to Payment
                </button>
            </form>
        </div>
    );
};

export default TripForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTrip } from "../../Services/TripService";

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

            if (image) {
                formData.append("image", image);
            }

            await addTrip(formData);

            alert("Trip Added Successfully");

            navigate("/trip");
        } catch (error) {
            console.error(error);
            alert("Failed to Add Trip");
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
                    placeholder="Location"
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

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Add Trip
                </button>
            </form>
        </div>
    );
};

export default TripForm;
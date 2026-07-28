import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmergency } from "../../Services/EmergencyService";

const EmergencyForm = () => {
    const navigate = useNavigate();

    const [emergency, setEmergency] = useState({
        vehicleName: "",
        vehicleNumber: "",
        vehicleType: "",
        driverName: "",
        driverContact: "",
        location: "",
        availability: "Available",
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEmergency({
            ...emergency,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            
            formData.append("userId", localStorage.getItem("userId"));
            formData.append("vehicleName", emergency.vehicleName);
            formData.append("vehicleNumber", emergency.vehicleNumber);
            formData.append("vehicleType", emergency.vehicleType);
            formData.append("driverName", emergency.driverName);
            formData.append("driverContact", emergency.driverContact);
            formData.append("location", emergency.location);
            formData.append("availability", emergency.availability);

            if (image) {
                formData.append("image", image);
            }

            await addEmergency(formData);

            alert("Emergency Vehicle Added Successfully");

            navigate("/emergency");
        } catch (error) {
            console.error(error);
            alert("Failed to Add Emergency Vehicle");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 space-y-4"
            >
                <h2 className="text-3xl font-bold text-center mb-4 text-red-600">
                    🚑 Add Emergency Vehicle
                </h2>

                <input
                    type="text"
                    name="vehicleName"
                    placeholder="Vehicle Name"
                    className="input input-bordered w-full"
                    value={emergency.vehicleName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    className="input input-bordered w-full"
                    value={emergency.vehicleNumber}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="vehicleType"
                    placeholder="Vehicle Type (Ambulance, Fire Truck...)"
                    className="input input-bordered w-full"
                    value={emergency.vehicleType}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="driverName"
                    placeholder="Driver Name"
                    className="input input-bordered w-full"
                    value={emergency.driverName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="driverContact"
                    placeholder="Driver Contact"
                    className="input input-bordered w-full"
                    value={emergency.driverContact}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="input input-bordered w-full"
                    value={emergency.location}
                    onChange={handleChange}
                    required
                />

                <select
                    name="availability"
                    className="select select-bordered w-full"
                    value={emergency.availability}
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
                    className="btn btn-error w-full"
                >
                    Add Emergency Vehicle
                </button>
            </form>
        </div>
    );
};

export default EmergencyForm;
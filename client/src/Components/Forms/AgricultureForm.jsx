import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAgriculture } from "../../Services/AgricultureService";

const AgricultureForm = () => {
    const navigate = useNavigate();

    const [agriculture, setAgriculture] = useState({
        name: "",
        category: "",
        location: "",
        ownerName: "",
        ownerContact: "",
        capacity: 1,
        available: false,
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setAgriculture({
            ...agriculture,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("name", agriculture.name);
            formData.append("category", agriculture.category);
            formData.append("location", agriculture.location);
            formData.append("ownerName", agriculture.ownerName);
            formData.append("ownerContact", agriculture.ownerContact);
            formData.append("capacity", agriculture.capacity);
            formData.append("available", agriculture.available);

            if (image) {
                formData.append("image", image);
            }

            await addAgriculture(formData);

            alert("Agriculture record added successfully");

            navigate("/agriculture");
        } catch (error) {
            console.error(error);
            alert("Failed to add agriculture record");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 space-y-4"
            >
                <h2 className="text-3xl font-bold text-center mb-4">
                    Add Agriculture
                </h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Agriculture Name"
                    className="input input-bordered w-full"
                    value={agriculture.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="input input-bordered w-full"
                    value={agriculture.category}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="input input-bordered w-full"
                    value={agriculture.location}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="ownerName"
                    placeholder="Owner Name"
                    className="input input-bordered w-full"
                    value={agriculture.ownerName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="ownerContact"
                    placeholder="Owner Contact"
                    className="input input-bordered w-full"
                    value={agriculture.ownerContact}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    className="input input-bordered w-full"
                    value={agriculture.capacity}
                    onChange={handleChange}
                    min="1"
                    required
                />

                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="available"
                        checked={agriculture.available}
                        onChange={handleChange}
                    />
                    Available
                </label>

                <div>
                    <label className="block mb-2 font-semibold">
                        Image (Optional)
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
                    Add Agriculture
                </button>
            </form>
        </div>
    );
};

export default AgricultureForm;
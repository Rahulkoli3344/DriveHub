import React from "react";

export default function TripCard({
    trip,
    editingId,
    editedTrip,
    onChange,
    onSave,
    onCancel,
    onEdit,
    onDelete,
}) {
    const isEditing = editingId === trip.id;

    return (
        <div className="card bg-base-100 border border-gray-300 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            {/* Image */}
            <figure>
                <img
                    src={`https://localhost:7041${isEditing ? editedTrip.imagePath : trip.imagePath}`}
                    alt={trip.vehicleName}
                    className="h-56 w-full object-cover"
                    onError={(e) => {
                        e.target.src = "https://localhost:7041/uploads/default-trip.webp";
                    }}
                />
            </figure>

            <div className="card-body">

                {/* ================= EDIT MODE ================= */}

                {isEditing ? (
                    <>

                        <label className="font-semibold">Vehicle Name</label>
                        <input
                            type="text"
                            name="vehicleName"
                            value={editedTrip.vehicleName}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Vehicle Number</label>
                        <input
                            type="text"
                            name="vehicleNumber"
                            value={editedTrip.vehicleNumber}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={editedTrip.category}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={editedTrip.location}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Owner Name</label>
                        <input
                            type="text"
                            name="ownerName"
                            value={editedTrip.ownerName}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Owner Contact</label>
                        <input
                            type="text"
                            name="ownerContact"
                            value={editedTrip.ownerContact}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Seating Capacity</label>
                        <input
                            type="number"
                            name="seatingCapacity"
                            value={editedTrip.seatingCapacity}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <div className="form-control mt-4">
                            <label className="cursor-pointer flex items-center gap-3">
                                <span className="font-semibold">AC Available</span>

                                <input
                                    type="checkbox"
                                    name="acAvailable"
                                    checked={editedTrip.acAvailable}
                                    onChange={onChange}
                                    className="checkbox checkbox-primary"
                                />
                            </label>
                        </div>

                        <label className="font-semibold mt-2">
                            Vehicle Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered w-full"
                            disabled
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            Image update will be enabled in the next step.
                        </p>

                        <div className="card-actions justify-end mt-6">

                            <button
                                className="btn btn-success"
                                onClick={onSave}
                            >
                                Save
                            </button>

                            <button
                                className="btn btn-outline"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>

                        </div>

                    </>
                ) : (
                    <>
                        {/* ================= VIEW MODE ================= */}

                        <div className="flex justify-between items-center">

                            <h2 className="text-2xl font-bold text-primary">
                                {trip.vehicleName}
                            </h2>

                            <div className="badge badge-primary badge-lg">
                                {trip.category}
                            </div>

                        </div>

                        <div className="space-y-3 mt-4 text-[16px]">

                            <p>
                                🚗 <span className="font-semibold">Vehicle :</span>
                                {" "}
                                {trip.vehicleNumber}
                            </p>

                            <p>
                                📍 <span className="font-semibold">Location :</span>
                                {" "}
                                {trip.location}
                            </p>

                            <p>
                                👤 <span className="font-semibold">Owner :</span>
                                {" "}
                                {trip.ownerName}
                            </p>

                            <p>
                                📞 <span className="font-semibold">Contact :</span>
                                {" "}
                                {trip.ownerContact}
                            </p>

                            <p>
                                👥 <span className="font-semibold">Seats :</span>
                                {" "}
                                {trip.seatingCapacity}
                            </p>

                            <p>
                                ❄️ <span className="font-semibold">AC :</span>
                                {" "}
                                {trip.acAvailable ? "Available" : "Not Available"}
                            </p>

                        </div>

                        <div className="flex justify-between mt-6">

                            <button
                                className="btn btn-warning w-[48%]"
                                onClick={() => onEdit(trip)}
                            >
                                ✏️ Update
                            </button>

                            <button
                                className="btn btn-error w-[48%]"
                                onClick={() => onDelete(trip.id)}
                            >
                                🗑 Delete
                            </button>

                        </div>

                    </>
                )}

            </div>

        </div>
    );
}
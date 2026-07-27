import React from "react";

export default function ConstructionCard({
    construction,
    editingId,
    editedConstruction,
    onChange,
    onSave,
    onCancel,
    onEdit,
    onDelete,
}) {
    const isEditing = editingId === construction.id;

    return (
        <div className="card bg-base-100 border border-gray-300 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

            {/* Image */}
            <figure>
                <img
                    src={isEditing ? editedConstruction.imagePath : construction.imagePath}
                    alt={construction.vehicleName}
                    className="h-56 w-full object-cover"
                />
            </figure>

            <div className="card-body">

                {isEditing ? (
                    <>
                        <label className="font-semibold">User Name</label>
                        <input
                            type="text"
                            name="userName"
                            value={editedConstruction.userName}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Contact Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={editedConstruction.contactNumber}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Vehicle Name</label>
                        <input
                            type="text"
                            name="vehicleName"
                            value={editedConstruction.vehicleName}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Vehicle Number</label>
                        <input
                            type="text"
                            name="vehicleNumber"
                            value={editedConstruction.vehicleNumber}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Work Type</label>
                        <input
                            type="text"
                            name="workType"
                            value={editedConstruction.workType}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={editedConstruction.location}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Description</label>
                        <textarea
                            name="description"
                            value={editedConstruction.description}
                            onChange={onChange}
                            className="textarea textarea-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Status</label>
                        <select
                            name="status"
                            value={editedConstruction.status}
                            onChange={onChange}
                            className="select select-bordered w-full"
                        >
                            <option value="Available">Available</option>
                            <option value="Busy">Busy</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>

                        <label className="font-semibold mt-2">Image URL</label>
                        <input
                            type="text"
                            name="imagePath"
                            value={editedConstruction.imagePath}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

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
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-yellow-600">
                                🚧 Construction
                            </h2>

                            <div className="badge badge-warning badge-lg">
                                {construction.status}
                            </div>
                        </div>

                        <div className="space-y-3 mt-4 text-[16px]">

                            <p>
                                <strong>👤 User :</strong>{" "}
                                {construction.userName}
                            </p>

                            <p>
                                <strong>📞 Contact :</strong>{" "}
                                {construction.contactNumber}
                            </p>

                            <p>
                                <strong>🚜 Vehicle :</strong>{" "}
                                {construction.vehicleName}
                            </p>

                            <p>
                                <strong>🔢 Number :</strong>{" "}
                                {construction.vehicleNumber}
                            </p>

                            <p>
                                <strong>🏗 Work :</strong>{" "}
                                {construction.workType}
                            </p>

                            <p>
                                <strong>📍 Location :</strong>{" "}
                                {construction.location}
                            </p>

                            <p>
                                <strong>📝 Description :</strong>{" "}
                                {construction.description}
                            </p>

                        </div>

                        <div className="flex justify-between mt-6">

                            <button
                                className="btn btn-warning w-[48%]"
                                onClick={() => onEdit(construction)}
                            >
                                ✏️ Update
                            </button>

                            <button
                                className="btn btn-error w-[48%]"
                                onClick={() => onDelete(construction.id)}
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
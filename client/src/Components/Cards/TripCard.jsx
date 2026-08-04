import React from "react";
import {
    HiOutlineMapPin,
    HiOutlineTruck,
    HiOutlineUser,
    HiOutlineUserGroup,
    HiOutlineClipboardDocument,
    HiOutlinePencilSquare,
    HiOutlineTrash,
} from "react-icons/hi2";

export default function TripCard({
    trip,
    editingId,
    editedTrip,
    onChange,
    onSave,
    onCancel,
    onEdit,
    onDelete,
    showActions = false,
}) {
    const isEditing = editingId === trip.id;

    const copyNumber = async (number) => {
        try {
            await navigator.clipboard.writeText(number);
            alert("📋 Phone number copied successfully!");
        } catch (err) {
            alert("❌ Failed to copy phone number.");
        }
    };

    return (
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300">
            {/* Image */}
            <figure>
                <img
                    src={
                        isEditing
                            ? editedTrip.imagePath
                            : trip.imagePath || "/default-trip.webp"
                    }
                    alt={trip.vehicleName}
                    className="h-60 w-full object-cover"
                    onError={(e) => {
                        e.target.src = "/default-trip.webp";
                    }}
                />
            </figure>

            <div className="card-body p-6">

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

                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                                {trip.vehicleName}
                            </h2>

                            <span className="px-3 py-1 rounded-full bg-emerald-50 text-black border border-emerald-100 text-sm font-semibold">
                                {trip.category}
                            </span>

                        </div>

                        <div className="space-y-2 mt-5">

                            <p className="flex items-center gap-2 text-gray-600">
                                <HiOutlineMapPin className="w-5 h-5 text-gray-400" />
                                {trip.location}
                            </p>

                            <p className="flex items-center gap-2 text-gray-600">
                                <HiOutlineTruck className="w-5 h-5 text-gray-400" />
                                {trip.vehicleNumber}
                            </p>

                            <p className="flex items-center gap-2 text-gray-600">
                                <HiOutlineUser className="w-5 h-5 text-gray-400" />
                                {trip.ownerName}
                            </p>

                            <p className="flex items-center gap-2 text-gray-600">
                                <HiOutlineUserGroup className="w-5 h-5 text-gray-400" />
                                {trip.seatingCapacity} Seats
                            </p>

                            <p className="flex items-center gap-2 text-gray-600">
                                ❄ {trip.acAvailable ? "AC Available" : "Non AC"}
                            </p>

                            <div className="bg-gray-100 rounded-xl p-3 mt-4">

                                <p className="text-sm text-gray-500">
                                    Owner Contact
                                </p>

                                <p className="text-lg font-bold text-gray-800">
                                    {trip.ownerContact}
                                </p>

                            </div>

                        </div>

                        <button
                            className="w-full flex items-center justify-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl font-semibold py-3 transition-all duration-300"
                        >
                            <HiOutlineClipboardDocument className="w-5 h-5" />
                            <span>Copy Number</span>
                        </button>



                        {showActions && (
                            <div className="flex justify-between mt-6">

                                <button
                                    className="w-[48%] flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-medium py-3 transition-all duration-300"
                                    onClick={() => onEdit(trip)}
                                >
                                    <HiOutlinePencilSquare className="w-5 h-5" />
                                    <span>Update</span>
                                </button>

                                <button
                                    className="w-[48%] flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 rounded-xl font-medium py-3 transition-all duration-300"
                                    onClick={() => onDelete(trip.id)}
                                >
                                    <HiOutlineTrash className="w-5 h-5" />
                                    <span>Delete</span>
                                </button>

                            </div>
                        )}

                    </>
                )}

            </div>

        </div>
    );
}
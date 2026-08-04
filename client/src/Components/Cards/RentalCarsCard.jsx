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

export default function RentalCarCard({
    rentalCar,
    editingId,
    editedRentalCar,
    onChange,
    onSave,
    onCancel,
    onEdit,
    onDelete,
    showActions = false,
}) {

    const isEditing = editingId === rentalCar.id;

    const imageUrl = (path) => {
        if (!path) return "/default-rentalcar.webp";

        return path;
    };

    const copyNumber = async (number) => {
        try {
            await navigator.clipboard.writeText(number);
            alert("📋 Phone number copied successfully!");
        } catch {
            alert("❌ Failed to copy phone number.");
        }
    };

    return (
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300">

            <figure>
                <img
                    src={imageUrl(
                        isEditing
                            ? editedRentalCar.imagePath
                            : rentalCar.imagePath
                    )}
                    alt={rentalCar.vehicleName}
                    className="h-60 w-full object-cover"
                    onError={(e) => {
                        e.target.src = "/default-rentalcar.webp";
                    }}
                />
            </figure>

            <div className="card-body p-6">

                {isEditing ? (
                    <>

                        <label className="font-semibold">Vehicle Name</label>
                        <input
                            type="text"
                            name="vehicleName"
                            value={editedRentalCar.vehicleName}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Vehicle Number</label>
                        <input
                            type="text"
                            name="vehicleNumber"
                            value={editedRentalCar.vehicleNumber}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={editedRentalCar.category}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={editedRentalCar.location}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Owner Name</label>
                        <input
                            type="text"
                            name="ownerName"
                            value={editedRentalCar.ownerName}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">Owner Contact</label>
                        <input
                            type="text"
                            name="ownerContact"
                            value={editedRentalCar.ownerContact}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <label className="font-semibold mt-2">
                            Seating Capacity
                        </label>
                        <input
                            type="number"
                            name="seatingCapacity"
                            value={editedRentalCar.seatingCapacity}
                            onChange={onChange}
                            className="input input-bordered w-full"
                        />

                        <div className="form-control mt-4">
                            <label className="cursor-pointer flex items-center gap-3">
                                <span className="font-semibold">AC Available</span>

                                <input
                                    type="checkbox"
                                    name="acAvailable"
                                    checked={editedRentalCar.acAvailable}
                                    onChange={onChange}
                                    className="checkbox checkbox-primary"
                                />
                            </label>
                        </div>


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

                            <h2 className="text-xl font-bold text-gray-900">
                                {rentalCar.vehicleName}
                            </h2>

                            <span className="px-3 py-1 rounded-full bg-blue-50 text-black border border-blue-100 text-sm font-semibold">
                                {rentalCar.category}
                            </span>

                        </div>


                        <div className="space-y-2 mt-5">

                            <p className="flex items-center gap-2 text-gray-600">
                                <HiOutlineMapPin className="w-5 h-5 text-gray-400" />
                                {rentalCar.location}
                            </p>


                            <p className="flex items-center gap-2 text-gray-600">
                                <HiOutlineTruck className="w-5 h-5 text-gray-400" />
                                {rentalCar.vehicleNumber}
                            </p>


                            <p className="flex items-center gap-2 text-gray-600">
                                <HiOutlineUser className="w-5 h-5 text-gray-400" />
                                {rentalCar.ownerName}
                            </p>


                            <p className="flex items-center gap-2 text-gray-600">
                                <HiOutlineUserGroup className="w-5 h-5 text-gray-400" />
                                {rentalCar.seatingCapacity} Seats
                            </p>

                            <p className="flex items-center gap-2 text-gray-600">
                                ❄ {rentalCar.acAvailable ? "AC Available" : "Non AC"}
                            </p>



                            <div className="bg-gray-100 rounded-xl p-3 mt-4">

                                <p className="text-sm text-gray-500">
                                    Owner Contact
                                </p>

                                <p className="text-lg font-bold text-gray-800">
                                    {rentalCar.ownerContact}
                                </p>

                            </div>

                        </div>


                        <button
                            onClick={() => copyNumber(rentalCar.ownerContact)}
                            className="w-full flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl font-semibold py-3 transition-all duration-300"
                        >
                            <HiOutlineClipboardDocument className="w-5 h-5" />
                            <span>Copy Number</span>
                        </button>


                        {showActions && (
                            <div className="flex justify-between mt-6">

                                <button
                                    className="w-[48%] flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-medium py-3"
                                    onClick={() => onEdit(rentalCar)}
                                >
                                    <HiOutlinePencilSquare className="w-5 h-5" />
                                    <span>Update</span>
                                </button>


                                <button
                                    className="w-[48%] flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 rounded-xl font-medium py-3"
                                    onClick={() => onDelete(rentalCar.id)}
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
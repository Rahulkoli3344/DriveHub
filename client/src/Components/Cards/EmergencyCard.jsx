import React from "react";
import {
  HiOutlineMapPin,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineClipboardDocument,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

export default function EmergencyCard({
  emergency,
  editingId,
  editedEmergency,
  onChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  showActions = false,
}) {

  const isEditing = editingId === emergency.id;

  const imageUrl = (path) => {
    if (!path) return "/default-emergency.webp";

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

  const availabilityClass =
    emergency.availability === "Available"
      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
      : emergency.availability === "Busy"
        ? "bg-amber-50 text-amber-700 border border-amber-100"
        : "bg-red-50 text-red-700 border border-red-100";

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <figure className="h-56 overflow-hidden">
        <img
          src={imageUrl(
            isEditing ? editedEmergency.imagePath : emergency.imagePath
          )}
          alt={emergency.vehicleName}
          className="h-60 w-full object-cover"
          onError={(e) => {
            e.target.src = "/default-emergency.webp";
          }}
        />
      </figure>

      <div className="card-body p-6">
        {isEditing ? (
          <>
            <input
              className="input input-bordered w-full"
              name="vehicleName"
              value={editedEmergency.vehicleName}
              onChange={onChange}
            />

            <input
              className="input input-bordered w-full mt-2"
              name="vehicleNumber"
              value={editedEmergency.vehicleNumber}
              onChange={onChange}
            />

            <input
              className="input input-bordered w-full mt-2"
              name="vehicleType"
              value={editedEmergency.vehicleType}
              onChange={onChange}
            />

            <input
              className="input input-bordered w-full mt-2"
              name="driverName"
              value={editedEmergency.driverName}
              onChange={onChange}
            />

            <input
              className="input input-bordered w-full mt-2"
              name="driverContact"
              value={editedEmergency.driverContact}
              onChange={onChange}
            />

            <input
              className="input input-bordered w-full mt-2"
              name="location"
              value={editedEmergency.location}
              onChange={onChange}
            />

            <select
              className="select select-bordered w-full mt-2"
              name="availability"
              value={editedEmergency.availability}
              onChange={onChange}
            >
              <option>Available</option>
              <option>Busy</option>
              <option>Maintenance</option>
            </select>

            <div className="flex gap-2 mt-5">
              <button className="btn btn-success flex-1" onClick={onSave}>
                Save
              </button>

              <button className="btn btn-outline flex-1" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">

              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                {emergency.vehicleName}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${availabilityClass}`}
              >
                {emergency.availability}
              </span>

            </div>

            <div className="space-y-2 mt-5">

              <p className="flex items-center gap-2 text-gray-600">
                <HiOutlineUser className="w-5 h-5 text-gray-400" />
                {emergency.driverName}
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <HiOutlineTruck className="w-5 h-5 text-gray-400" />
                {emergency.vehicleNumber}
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <HiOutlineMapPin className="w-5 h-5 text-gray-400" />
                {emergency.location}
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-3">
                <p className="text-sm text-gray-500">
                  Vehicle Type
                </p>

                <p className="text-lg font-bold text-gray-800">
                  {emergency.vehicleType}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">

                <p className="text-sm text-gray-500">
                  Driver Contact
                </p>

                <p className="text-lg font-bold text-gray-800">
                  {emergency.driverContact}
                </p>

              </div>

              <button
                onClick={() => copyNumber(emergency.driverContact)}
                className="w-full flex items-center justify-center gap-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-sm font-medium rounded-xl py-2.5 transition-all duration-300 mt-5"
              >
                <HiOutlineClipboardDocument className="w-4 h-4" />
                <span>Copy Number</span>
              </button>

            </div>

            {showActions && (
              <div className="flex justify-between mt-6">

                <button
                  className="w-[48%] flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-sm font-medium py-2.5 transition-all duration-300"
                  onClick={() => onEdit(emergency)}
                >
                  <HiOutlinePencilSquare className="w-4 h-4" />
                  <span>Update</span>
                </button>

                <button
                  className="w-[48%] flex items-center justify-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 rounded-xl text-sm font-medium py-2.5 transition-all duration-300"
                  onClick={() => onDelete(emergency.id)}
                >
                  <HiOutlineTrash className="w-4 h-4" />
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
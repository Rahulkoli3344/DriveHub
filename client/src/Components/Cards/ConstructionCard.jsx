import React from "react";
import {
  HiOutlineMapPin,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineClipboardDocument,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

export default function ConstructionCard({
  construction,
  editingId,
  editedConstruction,
  onChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  showActions = false,
}) {
  const isEditing = editingId === construction.id;

  const imageUrl = (path) => {
    if (!path) return "https://localhost:7041/uploads/default-trip.webp";

    if (path.startsWith("http")) return path;

    return `https://localhost:7041${path}`;
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
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <figure>
        <img
          src={imageUrl(
            isEditing
              ? editedConstruction.imagePath
              : construction.imagePath
          )}
          alt={construction.vehicleName}
          className="h-60 w-full object-cover" onError={(e) => {
            e.target.src = "https://localhost:7041/uploads/default-trip.webp";
          }}
        />
      </figure>

      <div className="card-body p-6">

        {/* ================= EDIT MODE ================= */}

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
                {construction.vehicleName}
              </h2>

              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-semibold">
                {construction.status}
              </span>

            </div>

            <div className="space-y-2 mt-5">

              <p className="flex items-center gap-2 text-gray-600">
                <HiOutlineUser className="w-5 h-5 text-gray-400" />
                {construction.userName}
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <HiOutlineTruck className="w-5 h-5 text-gray-400" />
                {construction.vehicleNumber}
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <HiOutlineMapPin className="w-5 h-5 text-gray-400" />
                {construction.location}
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <HiOutlineWrenchScrewdriver className="w-5 h-5 text-gray-400" />
                {construction.workType}
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">

                <p className="text-sm text-gray-500">
                  Description
                </p>

                <p
                  className="text-gray-700 mt-1 truncate"
                  title={construction.description}
                >
                  {construction.description}
                </p>

                <button
                  onClick={() => copyNumber(construction.contactNumber)}
                  className="w-full flex items-center justify-center gap-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-sm font-medium rounded-xl py-2.5 transition-all duration-300 mt-5"
                >
                  <HiOutlineClipboardDocument className="w-4 h-4" />
                  <span>Copy Number</span>
                </button>

              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-3">

                <p className="text-sm text-gray-500">
                  Contact Number
                </p>

                <p className="text-lg font-bold text-gray-800">
                  {construction.contactNumber}
                </p>

              </div>

            </div>

            {showActions && (
              <div className="flex justify-between mt-6">

                <button
                  className="w-[48%] flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-sm font-medium py-2.5 transition-all duration-300"
                  onClick={() => onEdit(construction)}
                >
                  <HiOutlinePencilSquare className="w-4 h-4" />
                  <span>Update</span>
                </button>

                <button
                  className="w-[48%] flex items-center justify-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 rounded-xl text-sm font-medium py-2.5 transition-all duration-300"
                  onClick={() => onDelete(construction.id)}
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
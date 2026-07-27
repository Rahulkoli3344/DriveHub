import React from "react";

export default function HeavyLoadCard({
  heavyLoad,
  editingId,
  editedHeavyLoad,
  onChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) {
  const isEditing = editingId === heavyLoad.id;

  return (
    <div className="card bg-base-100 border border-gray-300 rounded-2xl shadow-xl h-[720px] flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Fixed Image */}
      <figure className="h-60 w-full overflow-hidden rounded-t-2xl">
        <img
          src={isEditing ? editedHeavyLoad.imagePath : heavyLoad.imagePath}
          alt={heavyLoad.vehicleName}
          className="w-full h-full object-cover object-center"
        />
      </figure>

      <div className="card-body flex flex-col flex-1">

        {isEditing ? (
          <>
            <input
              className="input input-bordered mb-2"
              name="userName"
              value={editedHeavyLoad.userName}
              onChange={onChange}
              placeholder="User Name"
            />

            <input
              className="input input-bordered mb-2"
              name="contactNumber"
              value={editedHeavyLoad.contactNumber}
              onChange={onChange}
              placeholder="Contact Number"
            />

            <input
              className="input input-bordered mb-2"
              name="vehicleName"
              value={editedHeavyLoad.vehicleName}
              onChange={onChange}
            />

            <input
              className="input input-bordered mb-2"
              name="vehicleNumber"
              value={editedHeavyLoad.vehicleNumber}
              onChange={onChange}
            />

            <input
              className="input input-bordered mb-2"
              name="workType"
              value={editedHeavyLoad.workType}
              onChange={onChange}
            />

            <input
              className="input input-bordered mb-2"
              name="location"
              value={editedHeavyLoad.location}
              onChange={onChange}
            />

            <textarea
              className="textarea textarea-bordered mb-2 h-24"
              name="description"
              value={editedHeavyLoad.description}
              onChange={onChange}
            />

            <select
              className="select select-bordered mb-2"
              name="status"
              value={editedHeavyLoad.status}
              onChange={onChange}
            >
              <option>Available</option>
              <option>Busy</option>
              <option>Maintenance</option>
            </select>

            <input
              className="input input-bordered"
              name="imagePath"
              value={editedHeavyLoad.imagePath}
              onChange={onChange}
            />

            <div className="mt-auto flex gap-3">
              <button
                className="btn btn-success flex-1"
                onClick={onSave}
              >
                Save
              </button>

              <button
                className="btn btn-outline flex-1"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary">
                {heavyLoad.vehicleName}
              </h2>

              <div className="badge badge-primary">
                🚛 Heavy Load
              </div>
            </div>

            <div className="badge badge-outline mt-2">
              {heavyLoad.status}
            </div>

            {/* Information */}
            <div className="space-y-2 mt-4 flex-1">

              <p>
                👤 <span className="font-semibold">User:</span>{" "}
                {heavyLoad.userName}
              </p>

              <p>
                📞 <span className="font-semibold">Contact:</span>{" "}
                {heavyLoad.contactNumber}
              </p>

              <p>
                🚛 <span className="font-semibold">Vehicle No:</span>{" "}
                {heavyLoad.vehicleNumber}
              </p>

              <p>
                ⚙ <span className="font-semibold">Work:</span>{" "}
                {heavyLoad.workType}
              </p>

              <p>
                📍 <span className="font-semibold">Location:</span>{" "}
                {heavyLoad.location}
              </p>

              {/* Fixed Description */}
              <div className="h-20 overflow-hidden">
                <span className="font-semibold">📝 Description:</span>
                <p className="text-sm text-gray-500 mt-1">
                  {heavyLoad.description}
                </p>
              </div>

            </div>

            {/* Bottom Buttons */}
            <div className="mt-auto flex gap-3">
              <button
                className="btn btn-warning flex-1"
                onClick={() => onEdit(heavyLoad)}
              >
                ✏ Update
              </button>

              <button
                className="btn btn-error flex-1"
                onClick={() => onDelete(heavyLoad.id)}
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
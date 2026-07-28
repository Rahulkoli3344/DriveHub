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
  showActions = false,
}) {
  const isEditing = editingId === construction.id;

  const imageUrl = (path) => {
    if (!path) return "https://localhost:7041/uploads/default-trip.webp";

    if (path.startsWith("http")) return path;

    return `https://localhost:7041${path}`;
  };

  return (
    <div className="card bg-base-100 border border-gray-300 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Image */}
      <figure>
        <img
          src={imageUrl(
            isEditing
              ? editedConstruction.imagePath
              : construction.imagePath
          )}
          alt={construction.vehicleName}
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

              <h2 className="text-2xl font-bold text-yellow-600">
                🚧 Construction
              </h2>

              <div className="badge badge-warning badge-lg">
                {construction.status}
              </div>

            </div>

            <div className="space-y-3 mt-4 text-[16px]">

              <p>
                👤 <span className="font-semibold">User :</span>{" "}
                {construction.userName}
              </p>

              <p>
                📞 <span className="font-semibold">Contact :</span>{" "}
                {construction.contactNumber}
              </p>

              <p>
                🚜 <span className="font-semibold">Vehicle :</span>{" "}
                {construction.vehicleName}
              </p>

              <p>
                🔢 <span className="font-semibold">Number :</span>{" "}
                {construction.vehicleNumber}
              </p>

              <p>
                🏗 <span className="font-semibold">Work :</span>{" "}
                {construction.workType}
              </p>

              <p>
                📍 <span className="font-semibold">Location :</span>{" "}
                {construction.location}
              </p>

              <p>
                📝 <span className="font-semibold">Description :</span>{" "}
                {construction.description}
              </p>

            </div>

            {showActions  && (
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
            )}

          </>
        )}

      </div>
    </div>
  );
}
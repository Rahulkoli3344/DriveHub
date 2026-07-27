import React from "react";

export default function EmergencyCard({
  emergency,
  editingId,
  editedEmergency,
  onChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) {
  const isEditing = editingId === emergency.id;

  const imageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/400x250";

    if (path.startsWith("http")) return path;

    return `https://localhost:7041${path}`;
  };

  return (
    <div className="card bg-base-100 border border-gray-700 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">

      <figure className="h-56 overflow-hidden">
        <img
          src={imageUrl(
            isEditing ? editedEmergency.imagePath : emergency.imagePath
          )}
          alt={emergency.vehicleName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body flex flex-col">

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

              <h2 className="card-title text-red-500 text-xl">
                🚑 Emergency
              </h2>

              <div className="badge badge-error">
                {emergency.availability}
              </div>

            </div>

            <div className="mt-4 space-y-2 text-sm">

              <p>
                <strong>👨 Driver:</strong> {emergency.driverName}
              </p>

              <p>
                <strong>📞 Contact:</strong> {emergency.driverContact}
              </p>

              <p>
                <strong>🚑 Vehicle:</strong> {emergency.vehicleName}
              </p>

              <p>
                <strong>🔢 Number:</strong> {emergency.vehicleNumber}
              </p>

              <p>
                <strong>⚠ Type:</strong> {emergency.vehicleType}
              </p>

              <p>
                <strong>📍 Location:</strong> {emergency.location}
              </p>

            </div>

            <div className="mt-auto flex gap-3 pt-6">

              <button
                className="btn btn-warning flex-1"
                onClick={() => onEdit(emergency)}
              >
                ✏ Update
              </button>

              <button
                className="btn btn-error flex-1"
                onClick={() => onDelete(emergency.id)}
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
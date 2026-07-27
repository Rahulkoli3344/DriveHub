import React from "react";

export default function LightLoadCard({
  lightLoad,
  editingId,
  editedLightLoad,
  onChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) {
  const isEditing = editingId === lightLoad.id;

  return (
    <div className="card bg-base-100 border border-gray-300 rounded-2xl shadow-xl h-[720px] flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <figure className="h-60 overflow-hidden">
        <img
          src={isEditing ? editedLightLoad.imagePath : lightLoad.imagePath}
          alt={lightLoad.vehicleName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body flex flex-col flex-1">

        {isEditing ? (
          <>
            <input
              className="input input-bordered mb-2"
              name="userName"
              value={editedLightLoad.userName}
              onChange={onChange}
              placeholder="User Name"
            />

            <input
              className="input input-bordered mb-2"
              name="contactNumber"
              value={editedLightLoad.contactNumber}
              onChange={onChange}
              placeholder="Contact Number"
            />

            <input
              className="input input-bordered mb-2"
              name="vehicleName"
              value={editedLightLoad.vehicleName}
              onChange={onChange}
              placeholder="Vehicle Name"
            />

            <input
              className="input input-bordered mb-2"
              name="vehicleNumber"
              value={editedLightLoad.vehicleNumber}
              onChange={onChange}
              placeholder="Vehicle Number"
            />

            <input
              className="input input-bordered mb-2"
              name="workType"
              value={editedLightLoad.workType}
              onChange={onChange}
              placeholder="Work Type"
            />

            <input
              className="input input-bordered mb-2"
              name="location"
              value={editedLightLoad.location}
              onChange={onChange}
              placeholder="Location"
            />

            <textarea
              className="textarea textarea-bordered mb-2 h-24"
              name="description"
              value={editedLightLoad.description}
              onChange={onChange}
            />

            <select
              className="select select-bordered mb-2"
              name="status"
              value={editedLightLoad.status}
              onChange={onChange}
            >
              <option>Available</option>
              <option>Busy</option>
              <option>Maintenance</option>
            </select>

            <input
              className="input input-bordered"
              name="imagePath"
              value={editedLightLoad.imagePath}
              onChange={onChange}
              placeholder="Image Path"
            />

            <div className="mt-auto flex gap-3">
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

              <h2 className="text-xl font-bold text-primary">
                {lightLoad.vehicleName}
              </h2>

              <div className="badge badge-primary">
                🚚 Light Load
              </div>

            </div>

            <div className="badge badge-outline mt-2">
              {lightLoad.status}
            </div>

            <div className="space-y-2 mt-4 flex-1">

              <p>
                👤 <span className="font-semibold">User:</span>{" "}
                {lightLoad.userName}
              </p>

              <p>
                📞 <span className="font-semibold">Contact:</span>{" "}
                {lightLoad.contactNumber}
              </p>

              <p>
                🚚 <span className="font-semibold">Vehicle No:</span>{" "}
                {lightLoad.vehicleNumber}
              </p>

              <p>
                📦 <span className="font-semibold">Work:</span>{" "}
                {lightLoad.workType}
              </p>

              <p>
                📍 <span className="font-semibold">Location:</span>{" "}
                {lightLoad.location}
              </p>

              <div className="h-20 overflow-hidden">
                <span className="font-semibold">📝 Description:</span>
                <p className="text-sm text-gray-500 mt-1">
                  {lightLoad.description}
                </p>
              </div>

            </div>

            <div className="mt-auto flex gap-3">

              <button
                className="btn btn-warning flex-1"
                onClick={() => onEdit(lightLoad)}
              >
                ✏ Update
              </button>

              <button
                className="btn btn-error flex-1"
                onClick={() => onDelete(lightLoad.id)}
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
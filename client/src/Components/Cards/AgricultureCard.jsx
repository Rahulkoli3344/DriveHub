import React from "react";

export default function AgricultureCard({
  agriculture,
  editingId,
  editedAgriculture,
  onChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) {
  const isEditing = editingId === agriculture.id;

  return (
    <div className="card bg-base-100 border border-gray-300 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Image */}
      <figure>
        <img
          src={isEditing ? editedAgriculture.imagePath : agriculture.imagePath}
          alt={agriculture.vehicleName}
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
              value={editedAgriculture.userName}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={editedAgriculture.contactNumber}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Vehicle Name</label>
            <input
              type="text"
              name="vehicleName"
              value={editedAgriculture.vehicleName}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              value={editedAgriculture.vehicleNumber}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Work Type</label>
            <input
              type="text"
              name="workType"
              value={editedAgriculture.workType}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Location</label>
            <input
              type="text"
              name="location"
              value={editedAgriculture.location}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Description</label>
            <textarea
              name="description"
              value={editedAgriculture.description}
              onChange={onChange}
              className="textarea textarea-bordered w-full"
            />

            <label className="font-semibold mt-2">Status</label>
            <select
              name="status"
              value={editedAgriculture.status}
              onChange={onChange}
              className="select select-bordered w-full"
            >
              <option>Available</option>
              <option>Busy</option>
              <option>Maintenance</option>
            </select>

            <label className="font-semibold mt-2">Image Path</label>
            <input
              type="text"
              name="imagePath"
              value={editedAgriculture.imagePath}
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
              <h2 className="text-2xl font-bold text-success">
                {agriculture.vehicleName}
              </h2>

              <div className="badge badge-success badge-lg">
                🚜 Agriculture
              </div>
            </div>

            <div className="badge badge-outline mt-2">
              {agriculture.status}
            </div>

            <div className="space-y-3 mt-4 text-[16px]">

              <p>
                👤 <span className="font-semibold">User :</span>{" "}
                {agriculture.userName}
              </p>

              <p>
                📞 <span className="font-semibold">Contact :</span>{" "}
                {agriculture.contactNumber}
              </p>

              <p>
                🚜 <span className="font-semibold">Vehicle :</span>{" "}
                {agriculture.vehicleName}
              </p>

              <p>
                🔢 <span className="font-semibold">Number :</span>{" "}
                {agriculture.vehicleNumber}
              </p>

              <p>
                🌾 <span className="font-semibold">Work :</span>{" "}
                {agriculture.workType}
              </p>

              <p>
                📍 <span className="font-semibold">Location :</span>{" "}
                {agriculture.location}
              </p>

              <p>
                📝 <span className="font-semibold">Description :</span>{" "}
                {agriculture.description}
              </p>

            </div>

            <div className="flex justify-between mt-6">

              <button
                className="btn btn-warning w-[48%]"
                onClick={() => onEdit(agriculture)}
              >
                ✏️ Update
              </button>

              <button
                className="btn btn-error w-[48%]"
                onClick={() => onDelete(agriculture.id)}
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
import React from "react";
import {
  HiOutlineMapPin,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineClipboardDocument,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

export default function HeavyLoadCard({
  heavyLoad,
  editingId,
  editedHeavyLoad,
  onChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  showActions = false,
}) {

  const isEditing = editingId === heavyLoad.id;

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

      <figure>
        <img
          src={`https://localhost:7041${isEditing ? editedHeavyLoad.imagePath : heavyLoad.imagePath}`}
          alt={heavyLoad.vehicleName}
          className="h-60 w-full object-cover"
          onError={(e) => {
            e.target.src = "https://localhost:7041/uploads/default-heavyload.webp";
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
              value={editedHeavyLoad.vehicleName}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              value={editedHeavyLoad.vehicleNumber}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Category</label>
            <input
              type="text"
              name="category"
              value={editedHeavyLoad.category}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Location</label>
            <input
              type="text"
              name="location"
              value={editedHeavyLoad.location}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={editedHeavyLoad.ownerName}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Owner Contact</label>
            <input
              type="text"
              name="ownerContact"
              value={editedHeavyLoad.ownerContact}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Load Capacity</label>
            <input
              type="text"
              name="loadCapacity"
              value={editedHeavyLoad.loadCapacity}
              onChange={onChange}
              className="input input-bordered w-full"
            />

            <label className="font-semibold mt-2">Description</label>
            <textarea
              name="description"
              value={editedHeavyLoad.description}
              onChange={onChange}
              className="textarea textarea-bordered w-full"
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

              <h2 className="text-xl font-bold text-gray-900">
                {heavyLoad.vehicleName}
              </h2>

              <span className="px-3 py-1 rounded-full bg-orange-50 text-black border border-orange-100 text-sm font-semibold">
                {heavyLoad.category}
              </span>

            </div>


            <div className="space-y-2 mt-5">

              <p className="flex items-center gap-2 text-gray-600">
                <HiOutlineMapPin className="w-5 h-5 text-gray-400" />
                {heavyLoad.location}
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <HiOutlineTruck className="w-5 h-5 text-gray-400" />
                {heavyLoad.vehicleNumber}
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <HiOutlineUser className="w-5 h-5 text-gray-400" />
                {heavyLoad.ownerName}
              </p>


              <div className="bg-gray-100 rounded-xl p-3 mt-4">

                <p className="text-sm text-gray-500">
                  Load Capacity
                </p>

                <p className="text-lg font-bold text-gray-800">
                  {heavyLoad.loadCapacity}
                </p>

              </div>


              <div className="bg-gray-100 rounded-xl p-3 mt-4">

                <p className="text-sm text-gray-500">
                  Description
                </p>

                <p className="text-gray-800">
                  {heavyLoad.description}
                </p>

              </div>


              <div className="bg-gray-100 rounded-xl p-3 mt-4">

                <p className="text-sm text-gray-500">
                  Owner Contact
                </p>

                <p className="text-lg font-bold text-gray-800">
                  {heavyLoad.ownerContact}
                </p>

              </div>

            </div>


            <button
              onClick={() => copyNumber(heavyLoad.ownerContact)}
              className="w-full flex items-center justify-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl font-semibold py-3 transition-all duration-300"
            >
              <HiOutlineClipboardDocument className="w-5 h-5" />
              <span>Copy Number</span>
            </button>


            {showActions && (
              <div className="flex justify-between mt-6">

                <button
                  className="w-[48%] flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-medium py-3"
                  onClick={() => onEdit(heavyLoad)}
                >
                  <HiOutlinePencilSquare className="w-5 h-5" />
                  <span>Update</span>
                </button>


                <button
                  className="w-[48%] flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 rounded-xl font-medium py-3"
                  onClick={() => onDelete(heavyLoad.id)}
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
import React from "react";

export default function RentalCarsCard({
  rentalCar,
  editingId,
  editedRentalCar,
  onEdit,
  onDelete,
  onSave,
  onChange,
}) {
  if (!rentalCar) return null;

  const edit = editingId === rentalCar.id;

  return (
    <div className="card bg-base-100 shadow-xl border rounded-xl overflow-hidden">

      <figure className="h-52">
        <img
          src={edit ? editedRentalCar.imagePath : rentalCar.imagePath}
          alt={rentalCar.vehicleName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">

        {edit ? (
          <>
            <input className="input input-bordered" name="userName" value={editedRentalCar.userName} onChange={onChange}/>
            <input className="input input-bordered" name="contactNumber" value={editedRentalCar.contactNumber} onChange={onChange}/>
            <input className="input input-bordered" name="vehicleName" value={editedRentalCar.vehicleName} onChange={onChange}/>
            <input className="input input-bordered" name="vehicleNumber" value={editedRentalCar.vehicleNumber} onChange={onChange}/>
            <input className="input input-bordered" name="fuelType" value={editedRentalCar.fuelType} onChange={onChange}/>
            <input className="input input-bordered" name="transmission" value={editedRentalCar.transmission} onChange={onChange}/>
            <input className="input input-bordered" name="seats" value={editedRentalCar.seats} onChange={onChange}/>
            <input className="input input-bordered" name="rentPerDay" value={editedRentalCar.rentPerDay} onChange={onChange}/>
            <input className="input input-bordered" name="location" value={editedRentalCar.location} onChange={onChange}/>
            <textarea className="textarea textarea-bordered" name="description" value={editedRentalCar.description} onChange={onChange}/>
            <input className="input input-bordered" name="imagePath" value={editedRentalCar.imagePath} onChange={onChange}/>

            <button className="btn btn-success mt-3" onClick={onSave}>
              Save
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-between">

              <h2 className="card-title">
                {rentalCar.vehicleName}
              </h2>

              <span className="badge badge-primary">
                {rentalCar.status}
              </span>

            </div>

            <div className="space-y-2 text-sm mt-3">

              <p>👤 <b>Owner:</b> {rentalCar.userName}</p>

              <p>📞 <b>Contact:</b> {rentalCar.contactNumber}</p>

              <p>🚗 <b>Vehicle No:</b> {rentalCar.vehicleNumber}</p>

              <p>⛽ <b>Fuel:</b> {rentalCar.fuelType}</p>

              <p>⚙️ <b>Transmission:</b> {rentalCar.transmission}</p>

              <p>👥 <b>Seats:</b> {rentalCar.seats}</p>

              <p>📍 <b>Location:</b> {rentalCar.location}</p>

              <p>💰 <b>Rent / Day:</b> ₹{rentalCar.rentPerDay}</p>

              <p>📝 <b>Description:</b> {rentalCar.description}</p>

            </div>

            <div className="card-actions mt-5">

              <button
                className="btn btn-warning flex-1"
                onClick={() => onEdit(rentalCar)}
              >
                Update
              </button>

              <button
                className="btn btn-error flex-1"
                onClick={() => onDelete(rentalCar.id)}
              >
                Delete
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
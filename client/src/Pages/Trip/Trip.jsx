import React, { useEffect, useState } from "react";
import axios from "axios";
import TripCard from "../../Components/Cards/TripCard";

export default function Trip() {

  const [trips, setTrips] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [editedTrip, setEditedTrip] = useState({});

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {

      const response = await axios.get(
        "https://localhost:7041/api/Trips"
      );

      setTrips(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://localhost:7041/api/Trips/${id}`
      );

      setTrips((prev) =>
        prev.filter((trip) => trip.id !== id)
      );

      alert("Trip Deleted Successfully");

    } catch (error) {

      console.error(error);

      alert("Delete Failed");

    }

  };

  const handleUpdate = (trip) => {

    setEditingId(trip.id);

    setEditedTrip({ ...trip });

  };

  const handleChange = (e) => {

    const { name, value, checked, type } = e.target;

    setEditedTrip((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));

  };

  const handleSave = async () => {

    try {

      const formData = new FormData();

      formData.append("vehicleName", editedTrip.vehicleName);
      formData.append("vehicleNumber", editedTrip.vehicleNumber);
      formData.append("category", editedTrip.category);
      formData.append("location", editedTrip.location);
      formData.append("ownerName", editedTrip.ownerName);
      formData.append("ownerContact", editedTrip.ownerContact);
      formData.append("seatingCapacity", editedTrip.seatingCapacity);
      formData.append("acAvailable", editedTrip.acAvailable);

      await axios.put(
        `https://localhost:7041/api/Trips/${editingId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchTrips();

      setEditingId(null);

      alert("Trip Updated Successfully");

    } catch (error) {

      console.error(error);

      alert("Update Failed");

    }

  };

  const handleCancel = () => {

    setEditingId(null);

    setEditedTrip({});

  };

  return (

    <div className="container mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center mb-10">

        Trip Vehicles

      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trips.map((trip) => (

          <TripCard

            key={trip.id}

            trip={trip}

            editingId={editingId}

            editedTrip={editedTrip}

            onChange={handleChange}

            onSave={handleSave}

            onCancel={handleCancel}

            onEdit={handleUpdate}

            onDelete={handleDelete}

          />

        ))}

      </div>

    </div>

  );

}
import React, { useEffect, useState } from "react";
import axios from "axios";
import RentalCarsCard from "../../Components/Cards/RentalCarsCard";

export default function RentalCars({
  onlyCurrentUser = false,
  showHeading = true,
  showSearch = true,
}) {
  const [rentalCars, setRentalCars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedRentalCar, setEditedRentalCar] = useState({});
  const [search, setSearch] = useState("");

  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("role") === "Admin";

  const filteredRentalCars = rentalCars.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.vehicleName.toLowerCase().includes(text) ||
      item.location.toLowerCase().includes(text)
    );
  });

  useEffect(() => {
    fetchRentalCars();
  }, []);

  const fetchRentalCars = async () => {
    try {
      let response;

      if (onlyCurrentUser) {
        response = await axios.get(
          `https://localhost:7041/api/RentalCar/user/${userId}`
        );
      } else {
        response = await axios.get(
          "https://localhost:7041/api/RentalCar"
        );
      }

      setRentalCars(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Rental Car?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://localhost:7041/api/RentalCar/${id}`
      );

      setRentalCars((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Rental Car Deleted Successfully");

    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };


  const handleUpdate = (item) => {

    setEditingId(item.id);
    setEditedRentalCar({ ...item });

  };


  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setEditedRentalCar((prev) => ({
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

      formData.append("vehicleName", editedRentalCar.vehicleName);
      formData.append("vehicleNumber", editedRentalCar.vehicleNumber);
      formData.append("category", editedRentalCar.category);
      formData.append("location", editedRentalCar.location);
      formData.append("ownerName", editedRentalCar.ownerName);
      formData.append("ownerContact", editedRentalCar.ownerContact);
      // formData.append("description", editedRentalCar.description);
      formData.append("seatingCapacity", editedRentalCar.seatingCapacity);
      formData.append("acAvailable", editedRentalCar.acAvailable);
      formData.append("userId", editedRentalCar.userId);
      formData.append("paymentMethod", editedRentalCar.paymentMethod);
      formData.append("paymentStatus", editedRentalCar.paymentStatus);
      formData.append("transactionId", editedRentalCar.transactionId);


      await axios.put(
        `https://localhost:7041/api/RentalCar/${editingId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );


      fetchRentalCars();

      setEditingId(null);

      alert("Rental Car Updated Successfully");


    } catch (error) {

      console.error(error);
      alert("Update Failed");

    }

  };


  const handleCancel = () => {

    setEditingId(null);
    setEditedRentalCar({});

  };


  return (
    <div className="container mx-auto px-6 py-8">

      {
        showHeading && (
          <h1 className="text-4xl font-bold text-center mb-10">
            Rental Cars
          </h1>
        )
      }


      {
        showSearch && (
          <div className="flex justify-center mb-6">

            <input
              type="text"
              placeholder="🔍 Search by Vehicle Name or Location..."
              className="input input-bordered w-full max-w-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>
        )
      }


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {
          filteredRentalCars.map((item) => (

            <RentalCarsCard

              key={item.id}

              rentalCar={item}

              editingId={editingId}

              editedRentalCar={editedRentalCar}

              onChange={handleChange}

              onSave={handleSave}

              onCancel={handleCancel}

              onEdit={handleUpdate}

              onDelete={handleDelete}

              showActions={onlyCurrentUser || isAdmin}

            />

          ))
        }

      </div>


    </div>
  );
}
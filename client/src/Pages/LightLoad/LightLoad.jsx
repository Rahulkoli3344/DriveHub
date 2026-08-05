import React, { useEffect, useState } from "react";
import axios from "axios";
import LightLoadCard from "../../Components/Cards/LightLoadCard";

export default function LightLoad({
  onlyCurrentUser = false,
  showHeading = true,
  showSearch = true,
}) {
  const [lightLoads, setLightLoads] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedLightLoad, setEditedLightLoad] = useState({});
  const [search, setSearch] = useState("");

  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("role") === "Admin";

  const filteredLightLoads = lightLoads.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.vehicleName.toLowerCase().includes(text) ||
      item.location.toLowerCase().includes(text)
    );
  });

  useEffect(() => {
    fetchLightLoads();
  }, []);

  const fetchLightLoads = async () => {
    try {
      let response;

      if (onlyCurrentUser) {
        response = await axios.get(
          `https://localhost:7041/api/LightLoad/user/${userId}`
        );
      } else {
        response = await axios.get(
          "https://localhost:7041/api/LightLoad"
        );
      }

      setLightLoads(response.data);

    } catch (error) {
      console.error(error);
    }
  };


  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Light Load vehicle?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://localhost:7041/api/LightLoad/${id}`
      );

      setLightLoads((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Light Load Deleted Successfully");

    } catch (error) {

      console.error(error);
      alert("Delete Failed");

    }
  };


  const handleUpdate = (item) => {

    setEditingId(item.id);
    setEditedLightLoad({ ...item });

  };


  const handleChange = (e) => {

    const { name, value } = e.target;

    setEditedLightLoad((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleSave = async () => {

    try {

      const formData = new FormData();

      formData.append("vehicleName", editedLightLoad.vehicleName);
      formData.append("vehicleNumber", editedLightLoad.vehicleNumber);
      formData.append("category", editedLightLoad.category);
      formData.append("location", editedLightLoad.location);
      formData.append("ownerName", editedLightLoad.ownerName);
      formData.append("ownerContact", editedLightLoad.ownerContact);
      formData.append("loadCapacity", editedLightLoad.loadCapacity);
      formData.append("description", editedLightLoad.description);
      formData.append("userId", editedLightLoad.userId);
      formData.append("paymentMethod", editedLightLoad.paymentMethod);
      formData.append("paymentStatus", editedLightLoad.paymentStatus);
      formData.append("transactionId", editedLightLoad.transactionId);


      await axios.put(
        `https://localhost:7041/api/LightLoad/${editingId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      fetchLightLoads();
      setEditingId(null);

      alert("Light Load Updated Successfully");


    } catch (error) {

      console.error(error);
      alert("Update Failed");

    }

  };


  const handleCancel = () => {

    setEditingId(null);
    setEditedLightLoad({});

  };


  return (

    <div className="container mx-auto px-6 py-8">

      {showHeading && (
        <h1 className="text-4xl font-bold text-center mb-10">
          Light Load Vehicles
        </h1>
      )}


      {showSearch && (

        <div className="flex justify-center mb-6">

          <input
            type="text"
            placeholder="🔍 Search by Vehicle Name or Location..."
            className="input input-bordered w-full max-w-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">


        {filteredLightLoads.map((item) => (

          <LightLoadCard

            key={item.id}

            lightLoad={item}

            editingId={editingId}

            editedLightLoad={editedLightLoad}

            onChange={handleChange}

            onSave={handleSave}

            onCancel={handleCancel}

            onEdit={handleUpdate}

            onDelete={handleDelete}

            showActions={onlyCurrentUser || isAdmin}

          />

        ))}


      </div>


    </div>

  );
}
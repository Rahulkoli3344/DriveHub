import React, { useEffect, useState } from "react";
import axios from "axios";
import HeavyLoadCard from "../../Components/Cards/HeavyLoadCard";

export default function HeavyLoad({
  onlyCurrentUser = false,
  showHeading = true,
  showSearch = true,
}) {
  const [heavyLoads, setHeavyLoads] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedHeavyLoad, setEditedHeavyLoad] = useState({});
  const [search, setSearch] = useState("");

  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("role") === "Admin";

  const filteredHeavyLoads = heavyLoads.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.vehicleName.toLowerCase().includes(text) ||
      item.location.toLowerCase().includes(text)
    );
  });

  useEffect(() => {
    fetchHeavyLoads();
  }, []);

  const fetchHeavyLoads = async () => {
    try {
      let response;

      if (onlyCurrentUser) {
        response = await axios.get(
          `https://localhost:7041/api/HeavyLoad/user/${userId}`
        );
      } else {
        response = await axios.get(
          "https://localhost:7041/api/HeavyLoad"
        );
      }

      setHeavyLoads(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Heavy Load vehicle?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://localhost:7041/api/HeavyLoad/${id}`
      );

      setHeavyLoads((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Heavy Load Deleted Successfully");

    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const handleUpdate = (item) => {
    setEditingId(item.id);
    setEditedHeavyLoad({ ...item });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedHeavyLoad((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("vehicleName", editedHeavyLoad.vehicleName);
      formData.append("vehicleNumber", editedHeavyLoad.vehicleNumber);
      formData.append("category", editedHeavyLoad.category);
      formData.append("location", editedHeavyLoad.location);
      formData.append("ownerName", editedHeavyLoad.ownerName);
      formData.append("ownerContact", editedHeavyLoad.ownerContact);
      formData.append("loadCapacity", editedHeavyLoad.loadCapacity);
      formData.append("description", editedHeavyLoad.description);
      formData.append("userId", editedHeavyLoad.userId);
      formData.append("paymentMethod", editedHeavyLoad.paymentMethod);
      formData.append("paymentStatus", editedHeavyLoad.paymentStatus);
      formData.append("transactionId", editedHeavyLoad.transactionId);

      await axios.put(
        `https://localhost:7041/api/HeavyLoad/${editingId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchHeavyLoads();
      setEditingId(null);

      alert("Heavy Load Updated Successfully");

    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Errors:", error.response?.data?.errors);

      alert("Update Failed");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedHeavyLoad({});
  };

  return (
    <div className="container mx-auto px-6 py-8">

      {showHeading && (
        <h1 className="text-4xl font-bold text-center mb-10">
          Heavy Load Vehicles
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

        {filteredHeavyLoads.map((item) => (
          <HeavyLoadCard
            key={item.id}
            heavyLoad={item}
            editingId={editingId}
            editedHeavyLoad={editedHeavyLoad}
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
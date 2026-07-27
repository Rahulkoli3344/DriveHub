import React, { useEffect, useState } from "react";
import axios from "axios";
import AgricultureCard from "../../Components/Cards/AgricultureCard";

export default function Agriculture() {
  const [agriculture, setAgriculture] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedAgriculture, setEditedAgriculture] = useState({});

  useEffect(() => {
    fetchAgriculture();
  }, []);

  const fetchAgriculture = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7041/api/Agriculture"
      );

      setAgriculture(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://localhost:7041/api/Agriculture/${id}`
      );

      setAgriculture((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Record Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const handleUpdate = (item) => {
    setEditingId(item.id);
    setEditedAgriculture({ ...item });
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setEditedAgriculture((prev) => ({
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

      formData.append("name", editedAgriculture.name);
      formData.append("category", editedAgriculture.category);
      formData.append("location", editedAgriculture.location);
      formData.append("ownerName", editedAgriculture.ownerName);
      formData.append("ownerContact", editedAgriculture.ownerContact);
      formData.append("capacity", editedAgriculture.capacity);
      formData.append("available", editedAgriculture.available);

      await axios.put(
        `https://localhost:7041/api/Agriculture/${editingId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchAgriculture();
      setEditingId(null);

      alert("Record Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedAgriculture({});
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Agriculture
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agriculture.map((item) => (
          <AgricultureCard
            key={item.id}
            agriculture={item}
            editingId={editingId}
            editedAgriculture={editedAgriculture}
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
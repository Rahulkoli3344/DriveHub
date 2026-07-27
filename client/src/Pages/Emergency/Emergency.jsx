import React, { useEffect, useState } from "react";
import axios from "axios";
import EmergencyCard from "../../Components/Cards/EmergencyCard";

export default function Emergency() {

  const [emergency, setEmergency] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [editedEmergency, setEditedEmergency] = useState({});

  useEffect(() => {
    fetchEmergency();
  }, []);

  const fetchEmergency = async () => {
    try {

      const response = await axios.get(
        "https://localhost:7041/api/Emergency"
      );

      setEmergency(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this emergency vehicle?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://localhost:7041/api/Emergency/${id}`
      );

      setEmergency((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Emergency Vehicle Deleted Successfully");

    } catch (error) {

      console.error(error);

      alert("Delete Failed");

    }

  };

  const handleUpdate = (item) => {

    setEditingId(item.id);

    setEditedEmergency({ ...item });

  };

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    setEditedEmergency((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

  };

  const handleSave = async () => {

    try {

      const formData = new FormData();

      formData.append("vehicleName", editedEmergency.vehicleName);
      formData.append("vehicleNumber", editedEmergency.vehicleNumber);
      formData.append("vehicleType", editedEmergency.vehicleType);
      formData.append("driverName", editedEmergency.driverName);
      formData.append("driverContact", editedEmergency.driverContact);
      formData.append("location", editedEmergency.location);
      formData.append("availability", editedEmergency.availability);

      if (editedEmergency.image instanceof File) {
        formData.append("image", editedEmergency.image);
      }

      await axios.put(
        `https://localhost:7041/api/Emergency/${editingId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchEmergency();

      setEditingId(null);

      alert("Emergency Vehicle Updated Successfully");

    } catch (error) {

      console.error(error);

      alert("Update Failed");

    }

  };

  const handleCancel = () => {

    setEditingId(null);

    setEditedEmergency({});

  };

  return (

    <div className="container mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center mb-10 text-red-600">

        🚑 Emergency Vehicles

      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {emergency.map((item) => (

          <EmergencyCard

            key={item.id}

            emergency={item}

            editingId={editingId}

            editedEmergency={editedEmergency}

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
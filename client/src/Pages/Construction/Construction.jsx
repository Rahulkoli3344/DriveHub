import React, { useEffect, useState } from "react";
import axios from "axios";
import ConstructionCard from "../../Components/Cards/ConstructionCard";

export default function Construction() {

  const [construction, setConstruction] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [editedConstruction, setEditedConstruction] = useState({});

  const [search, setSearch] = useState("");

  const filteredConstruction = construction.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.vehicleName.toLowerCase().includes(text) ||
      item.location.toLowerCase().includes(text)
    );
  });
  

  useEffect(() => {
    fetchConstruction();
  }, []);

  const fetchConstruction = async () => {
    try {

      const response = await axios.get(
        "https://localhost:7041/api/Construction"
      );

      setConstruction(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this construction vehicle?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://localhost:7041/api/Construction/${id}`
      );

      setConstruction((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Construction Vehicle Deleted Successfully");

    } catch (error) {

      console.error(error);

      alert("Delete Failed");

    }

  };

  const handleUpdate = (item) => {

    setEditingId(item.id);

    setEditedConstruction({ ...item });

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setEditedConstruction((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSave = async () => {

    try {

      const formData = new FormData();

      formData.append("vehicleName", editedConstruction.vehicleName);
      formData.append("vehicleNumber", editedConstruction.vehicleNumber);
      formData.append("workType", editedConstruction.workType);
      formData.append("userName", editedConstruction.userName);
      formData.append("contactNumber", editedConstruction.contactNumber);
      formData.append("location", editedConstruction.location);
      formData.append("description", editedConstruction.description);
      formData.append("status", editedConstruction.status);

      await axios.put(
        `https://localhost:7041/api/Construction/${editingId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchConstruction();

      setEditingId(null);

      alert("Construction Vehicle Updated Successfully");

    } catch (error) {

      console.error(error);

      alert("Update Failed");

    }

  };

  const handleCancel = () => {

    setEditingId(null);

    setEditedConstruction({});

  };

  return (

    <div className="container mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        Construction Vehicles
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Vehicle Name or Location..."
          className="input input-bordered w-full max-w-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {filteredConstruction.map((item) => (

          <ConstructionCard
            key={item.id}
            construction={item}
            editingId={editingId}
            editedConstruction={editedConstruction}
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
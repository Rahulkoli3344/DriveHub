import React from 'react';

const ManageVehicles = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Vehicles</h1>

      <div className="bg-white shadow rounded p-4">
        <p className="text-gray-700">
          This is the Manage Vehicles page for the admin panel.
        </p>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add New Vehicle
        </button>
      </div>
    </div>
  );
};

export default ManageVehicles;
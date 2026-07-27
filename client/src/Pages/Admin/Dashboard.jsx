import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    vehicles: 0,
    users: 0,
    bookings: 0,
  });

  useEffect(() => {
    const vehicles =
      JSON.parse(localStorage.getItem("vehicles")) || [];

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    setStats({
      vehicles: vehicles.length,
      users: users.length,
      bookings: bookings.length,
    });
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-blue-600 text-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold">
            Total Vehicles
          </h2>

          <p className="text-5xl font-bold mt-4">
            {stats.vehicles}
          </p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold">
            Total Users
          </h2>

          <p className="text-5xl font-bold mt-4">
            {stats.users}
          </p>
        </div>

        <div className="bg-red-600 text-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold">
            Total Bookings
          </h2>

          <p className="text-5xl font-bold mt-4">
            {stats.bookings}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <Link
          to="/admin/vehicles"
          className="btn btn-primary h-20"
        >
          Manage Vehicles
        </Link>

        <Link
          to="/admin/users"
          className="btn btn-secondary h-20"
        >
          Manage Users
        </Link>

        <Link
          to="/admin/bookings"
          className="btn btn-accent h-20"
        >
          Manage Bookings
        </Link>

      </div>

    </div>
  );
}
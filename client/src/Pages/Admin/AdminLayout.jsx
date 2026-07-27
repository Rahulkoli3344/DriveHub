import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-5">

        <h1 className="text-3xl font-bold mb-8">
          Admin Panel
        </h1>

        <div className="mb-8 border-b border-gray-600 pb-4">
          <p className="text-gray-300">Welcome</p>

          <h2 className="text-xl font-semibold">
            {user?.name || "Admin"}
          </h2>

          <p className="text-sm text-gray-400">
            {user?.email}
          </p>
        </div>

        <ul className="space-y-3">

          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `block rounded p-3 ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-700"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/vehicles"
              className={({ isActive }) =>
                `block rounded p-3 ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-700"
                }`
              }
            >
              Manage Vehicles
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `block rounded p-3 ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-700"
                }`
              }
            >
              Manage Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                `block rounded p-3 ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-700"
                }`
              }
            >
              Manage Bookings
            </NavLink>
          </li>

          <li className="pt-6">
            <button
              onClick={handleLogout}
              className="btn btn-error w-full"
            >
              Logout
            </button>
          </li>

        </ul>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        <div className="bg-white rounded-xl shadow p-6 min-h-full">
          <Outlet />
        </div>

      </main>

    </div>
  );
}
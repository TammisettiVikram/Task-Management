import { jwtDecode } from "jwt-decode";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard"; // ensure this file exists

export default function App() {
    const navigate = useNavigate();

    // Get token from localStorage
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;

    // Check if user is admin
    const isAdmin = user && user.role === "admin";

    return (
        <div>
            {/* Show Admin Panel button only if user is admin */}
            {isAdmin && (
                <button
                    onClick={() => navigate("/admin")}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Admin Panel
                </button>
            )}

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Admin route only available to admins */}
                {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
            </Routes>
        </div>
    );
}

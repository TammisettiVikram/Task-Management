import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        try {
            const formData = new FormData();
            formData.append("username", email);
            formData.append("password", password);

            const response = await api.post("/auth/login", formData);
            localStorage.setItem("token", response.data.access_token);
            setMessage({ text: "Login successful! Redirecting...", type: "success" });
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
            setMessage({ 
                text: err.response?.data?.detail || "Login failed", 
                type: "error" 
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Login</h1>

                {message.text && (
                    <p className={`p-2 rounded mb-4 text-center ${
                        message.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}>
                        {message.text}
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </form>
                <button 
                    onClick={() => navigate("/register")} 
                    className="w-full mt-4 text-sm text-gray-500 hover:underline"
                >
                    Don't have an account? Register
                </button>
            </div>
        </div>
    );
}

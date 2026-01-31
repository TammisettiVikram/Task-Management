import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // 1️⃣ Logout MUST come first and MUST be stable
    const handleLogout = useCallback(() => {
        localStorage.removeItem("token");
        navigate("/");
    }, [navigate]);

    // 2️⃣ Fetch tasks (depends on handleLogout)
    const fetchTasks = useCallback(async () => {
        if (!token) {
            handleLogout();
            return;
        }

        try {
            const res = await api.get("/tasks");
            setTasks(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
            if (err.response?.status === 401) {
                handleLogout();
            }
        }
    }, [token, handleLogout]);

    // 3️⃣ Effect
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleSaveTask = async () => {
        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        try {
            const payload = { title, description };

            if (editingId) {
                await api.put(`/tasks/${editingId}`, payload);
            } else {
                await api.post("/tasks", payload);
            }

            setTitle("");
            setDescription("");
            setEditingId(null);
            fetchTasks();
        } catch (err) {
            alert(err.response?.data?.detail || "Something went wrong");
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm("Delete this task?")) return;

        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch {
            alert("Could not delete task");
        }
    };

    const startEdit = (task) => {
        setEditingId(task.id);
        setTitle(task.title);
        setDescription(task.description);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Task Dashboard
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Input Area */}
                <div className="bg-gray-50 p-4 rounded-xl mb-6 shadow-inner">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">
                        {editingId ? "Edit Existing Task" : "Create New Task"}
                    </h2>

                    <div className="flex gap-2">
                        <input
                            className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            className="border p-2 rounded flex-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button
                            onClick={handleSaveTask}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded transition"
                        >
                            {editingId ? "Update" : "Add"}
                        </button>
                    </div>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                    {tasks.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No tasks yet. Create one above 👆
                        </p>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className="p-4 border rounded-xl flex justify-between items-center bg-white hover:bg-gray-50 transition shadow-sm"
                            >
                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        {task.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {task.description}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEdit(task)}
                                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

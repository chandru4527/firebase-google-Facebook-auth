import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();

            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-lg">
                <div className="flex flex-col items-center">
                    {user?.photoURL && (
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="mb-4 h-24 w-24 rounded-full"
                        />
                    )}

                    <h1 className="text-2xl font-bold">
                        {user?.displayName || "User"}
                    </h1>

                    <p className="mt-2 text-gray-500">
                        {user?.email}
                    </p>

                    <button
                        onClick={handleLogout}
                        className="mt-6 rounded-lg bg-red-500 px-6 py-3 text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
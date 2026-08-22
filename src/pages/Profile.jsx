import { useLocation, useNavigate } from "react-router-dom";

import {
    MdArrowBack,
    MdEmail,
    MdLogout,
    MdPerson,
    MdVerified,
    MdLogin,
    MdChevronRight,
} from "react-icons/md";

import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user: authUser } = useAuth();

    const passedUser = location.state?.user;

    const user = passedUser || authUser;

    const isFacebook = user?.provider === "facebook.com";

    const handleLogout = async () => {
        try {
            await logoutUser();

            navigate("/login", {
                replace: true,
            });
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-sm text-slate-500">
                    Loading profile...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <header className="border-b border-slate-200 bg-white">

                <div className="mx-auto flex max-w-6xl items-center px-5 py-4">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-slate-500 transition hover:text-slate-900"
                    >
                        <MdArrowBack className="text-xl" />

                        <span className="text-sm font-medium">
                            Back
                        </span>
                    </button>

                    <div className="mx-auto flex items-center gap-2">

                        <MdPerson className="text-xl text-slate-700" />

                        <h1 className="font-semibold text-slate-900">
                            Account
                        </h1>

                    </div>

                    <div className="w-12" />

                </div>

            </header>

            {/* Main */}
            <main className="mx-auto max-w-6xl px-5 py-8">

                <div className="grid overflow-hidden rounded border border-slate-200 bg-white shadow-sm md:grid-cols-[300px_1fr]">

                    {/* LEFT PROFILE */}
                    <aside className="border-b border-slate-200 bg-slate-50 p-8 md:border-b-0 md:border-r">

                        <div className="flex flex-col items-center text-center">

                            {/* Avatar */}
                            <div className="relative">

                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || "Profile"}
                                        referrerPolicy="no-referrer"
                                        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                                    />
                                ) : (
                                    <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-slate-200 shadow-md">
                                        <MdPerson className="text-5xl text-slate-400" />
                                    </div>
                                )}

                                <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-500">
                                    <MdVerified className="text-sm text-white" />
                                </div>

                            </div>

                            {/* Name */}
                            <h2 className="mt-5 text-xl font-bold text-slate-900">
                                {user.displayName || "User"}
                            </h2>

                            {/* Provider */}
                            <p className="mt-1 text-sm text-slate-500">
                                {isFacebook
                                    ? "Facebook Account"
                                    : "Google Account"}
                            </p>

                            {/* Status */}
                            <div className="mt-5 flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-medium text-green-600">

                                <span className="h-2 w-2 rounded-full bg-green-500" />

                                Account Active

                            </div>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="mt-8 flex w-full items-center justify-center gap-2 rounded border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-red-500 transition hover:border-red-200
                                 hover:bg-red-50 cursor-pointer"
                            >
                                <MdLogout className="text-lg" />

                                Logout
                            </button>

                        </div>

                    </aside>

                    {/* RIGHT CONTENT */}
                    <section className="p-6 sm:p-8">

                        <div className="mb-8">

                            <h2 className="text-xl font-bold text-slate-900">
                                Account Overview
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage and view your account information
                            </p>

                        </div>

                        {/* Full Name */}
                        <div className="rounded border border-slate-200 p-5 transition hover:border-slate-300">

                            <div className="flex items-center gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                                    <MdPerson className="text-xl text-slate-600" />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Full Name
                                    </p>

                                    <p className="mt-1 truncate font-semibold text-slate-900">
                                        {user.displayName || "Not available"}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Email */}
                        <div className="mt-4 rounded border border-slate-200 p-5 transition hover:border-slate-300">

                            <div className="flex items-center gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                                    <MdEmail className="text-xl text-slate-600" />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Email Address
                                    </p>

                                    <p className="mt-1 break-all font-semibold text-slate-900">
                                        {user.email || "No email available"}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Login */}
                        <div className="mt-8">

                            <h3 className="mb-4 text-sm font-semibold text-slate-900">
                                Login & Security
                            </h3>

                            <div className="rounded border border-slate-200">

                                <div className="flex items-center gap-4 p-5">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                                        <MdLogin className="text-xl text-slate-600" />
                                    </div>

                                    <div className="flex-1">

                                        <p className="font-semibold text-slate-900">
                                            Login Provider
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {isFacebook
                                                ? "Facebook"
                                                : "Google"}
                                        </p>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <span className="hidden rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 sm:block">
                                            Connected
                                        </span>

                                        <MdChevronRight className="text-xl text-slate-400" />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
};

export default Profile;
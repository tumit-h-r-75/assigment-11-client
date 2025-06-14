import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import registerSide from "../assets/register-1.json";
import registerInside from "../assets/register-2.json";

const Register = () => {
    const { createUser, googleSigneIn, theme } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const name = formData.get("name");
        const photo = formData.get("photo");
        const email = formData.get("email");
        const password = formData.get("password");

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;

        if (!hasUppercase || !hasLowercase || !hasMinLength) {
            toast.error(
                "Password must contain at least one uppercase, one lowercase and 6 characters minimum"
            );
            return;
        }

        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return updateProfile(user, {
                    displayName: name,
                    photoURL: photo,
                });
            })
            .then(() => {
                toast.success("Registration successful!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const handleGoogleLogin = () => {
        googleSigneIn()
            .then(() => {
                toast.success("Google Registration successful!");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 py-10 ${theme === "dark" ? " text-white" : " text-gray-900"
                }`}
        >
            <Helmet>
                <title>VolunteerHub || Register</title>
            </Helmet>

            <div
                className={`w-full max-w-md p-8 rounded-xl shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"
                    }`}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

                <div className="w-24 mx-auto mb-2">
                    <Lottie animationData={registerInside} loop={true} />
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Enter your name"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-black border-gray-300"
                                }`}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Photo URL</label>
                        <input
                            type="text"
                            name="photo"
                            required
                            placeholder="Paste your photo URL"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-black border-gray-300"
                                }`}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-black border-gray-300"
                                }`}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Create a password"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-black border-gray-300"
                                }`}
                        />
                        <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                            Must be at least 6 characters, include one uppercase and one
                            lowercase letter.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn btn-primary text-white py-2 rounded-md font-semibold bg-blue-600 hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>

                <div className="divider">OR</div>

                <button
                    onClick={handleGoogleLogin}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-md border transition ${theme === "dark"
                        ? "bg-gray-700 text-white border-gray-500 hover:bg-gray-600"
                        : "bg-white text-black border-gray-200 hover:bg-gray-100"
                        }`}
                >
                    <svg
                        aria-label="Google logo"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Register with Google
                </button>

                <p className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                        Login here
                    </Link>
                </p>
            </div>
            {/* animation */}
            <div className="hidden md:block md:w-1/2">
                <Lottie animationData={registerSide} loop={true} />
            </div>
        </div>
    );
};

export default Register;

import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";

const Register = () => {
    const { createUser, googleSigneIn } = useContext(AuthContext);
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

        // password validation
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;

        if (!hasUppercase || !hasLowercase || !hasMinLength) {
            toast.error(
                "Password must contain at least one uppercase, one lowercase and 6 characters minimum"
            );
            return;
        }

        // email,pass login
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
                navigate(from,{replace:true});
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    // google login 
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
        <div className="min-h-screen flex items-center justify-center  px-4 py-10">
            <Helmet>
                <title>VolunteerHub || Register</title>
            </Helmet>
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            name="photo"
                            required
                            placeholder="Paste your photo URL"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Create a password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Must be at least 6 characters, include one uppercase and one
                            lowercase letter.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn btn-primary text-white py-2 rounded-md font-semibold"
                    >
                        Register
                    </button>
                </form>

                <div className="my-4 text-center text-sm text-gray-500">OR</div>

                <button
                    onClick={handleGoogleLogin}
                    className="btn bg-white w-full text-black border-[#e5e5e5]"
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
                    Rregister with Google
                </button>

                <p className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

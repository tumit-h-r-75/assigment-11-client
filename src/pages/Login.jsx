import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import loginMain from '../assets/login-1.json'
import loginButton from '../assets/login-2.json'
import Lottie from 'lottie-react';

const Login = () => {
    const { signUser, googleSigneIn, theme } = use(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setLoading(true);
        try {
            await signUser(email, password);
            toast.success('Logged in successfully!');

            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await googleSigneIn();
            toast.success('Logged in with Google!');
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message || 'Google login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 py-10 ${theme === "dark" ? " text-white" : " text-gray-900"
            }`}>
            <Helmet>
                <title>VolunteerHub || Login</title>
            </Helmet>

            <div className="hidden md:block w-full md:w-1/2">
                <Lottie animationData={loginMain} loop={true} />
            </div>



            <div className={`w-full max-w-md p-8 rounded-xl shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}>
                <h2 className="text-2xl font-bold text-center mb-6">Login to VolunteerHub</h2>


                <div className='flex justify-center items-center '>
                    <Lottie animationData={loginButton} className="w-28 h-28 " />
                </div>


                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-black border-gray-300"
                                }`}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-black border-gray-300"
                                }`}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn btn-primary py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="divider">OR</div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-md border transition ${theme === "dark"
                        ? "bg-gray-700 text-white border-gray-500 hover:bg-gray-600"
                        : "bg-white text-black border-gray-200 hover:bg-gray-100"
                        }`}
                >
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g>
                    </svg>
                    <span className="ml-2">Login with Google</span>
                </button>

                <p className="mt-4 text-sm text-center">
                    Don’t have an account?
                    <Link to="/register" className="text-primary hover:underline font-medium ml-1">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

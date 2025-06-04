import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useState } from "react";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            toast.success("Subscribed successfully!");
            setEmail("");
        } else {
            toast.error("Please enter a valid email.");
        }
    };

    return (
        <footer className="bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800 mt-16 border-t border-blue-200">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Logo & About */}
                <div>
                    <h2 className="text-3xl font-bold text-blue-600 mb-3">VolunteerHub</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Bridging the gap between volunteers and impact-driven causes. Be part of a positive change.
                    </p>
                    <div className="flex gap-4 mt-4 text-blue-600 text-lg">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
                        <li><Link to="/all-posts" className="hover:text-blue-600 transition">All Posts</Link></li>
                        <li><Link to="/add-post" className="hover:text-blue-600 transition">Add Post</Link></li>
                        <li><Link to="/manage-posts" className="hover:text-blue-600 transition">Manage Posts</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-blue-600 transition">Help Center</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Contact Us</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        Stay updated with our latest opportunities & events.
                    </p>
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="bg-blue-50 py-4 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} VolunteerHub. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

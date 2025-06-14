import { useEffect, useState, useContext } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router";
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

// Animation variants
const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.4,
        },
    }),
};

const ManagePosts = () => {
    const { user } = useAuth();
    const [myPosts, setMyPosts] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const { theme } = useContext(AuthContext);

    useEffect(() => {
        if (user?.email) {
            const token = localStorage.getItem('accessToken');

            fetch(`https://volunteer-hub-server-fawn.vercel.app/my-volunteer-needs?email=${user.email}`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Error: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => setMyPosts(data))
                .catch(err => console.error('Failed to fetch my volunteer needs:', err));

            fetch(`https://volunteer-hub-server-fawn.vercel.app/my-volunteer-requests?email=${user.email}`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Error: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => setMyRequests(data))
                .catch(err => console.error('Failed to fetch my volunteer requests:', err));
        }
    }, [user]);


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://volunteer-hub-server-fawn.vercel.app/my-volunteer-needs/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Your post has been deleted.", "success");
                        const remainingPost = myPosts.filter((item) => item._id !== id);
                        setMyPosts(remainingPost);
                    }
                });
            }
        });
    };

    const handleCancelRequest = (id) => {
        Swal.fire({
            title: "Cancel Request?",
            text: "Do you want to Cancel your Request?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://volunteer-hub-server-fawn.vercel.app/my-volunteer-requests/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Canceled!", "Your Request has been Canceled.", "success");
                        const remainingRequest = myRequests.filter((item) => item._id !== id);
                        setMyRequests(remainingRequest);
                    }
                });
            }
        });
    };

    return (
        <div className={`max-w-7xl mx-auto p-4 ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
            <Helmet>
                <title>VolunteerHub || ManageDetails</title>
            </Helmet>

            {/* Heading with animation */}
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center my-6"
            >
                My Volunteer Need Posts
            </motion.h2>

            {/* My Posts Table */}
            {myPosts.length === 0 ? (
                <div className="text-center py-10">
                    <p className={`text-xl font-semibold ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        You haven't added any volunteer posts yet.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className={`table w-full border-collapse border ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
                        <thead className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                            <tr>
                                <th>#</th>
                                <th>Thumbnail</th>
                                <th>Title</th>
                                <th>Category & Location</th>
                                <th>Volunteers</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                            {myPosts.map((post, index) => (
                                <motion.tr
                                    key={post._id}
                                    custom={index}
                                    variants={fadeInVariant}
                                    initial="hidden"
                                    animate="visible"
                                    className={`border-t ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
                                >
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={post.thumbnail} alt={post.title} className="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td>{post.title}</td>
                                    <td>
                                        {post.category}
                                        <br />
                                        <span className="text-sm">{post.location}</span>
                                    </td>
                                    <td>{post.volunteersNeeded}</td>
                                    <td>{post.deadline}</td>
                                    <td className="flex flex-col gap-2">
                                        <Link to={`/update-data/${post._id}`} className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white">
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className={`divider my-10 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>and</div>

            {/* Second Section Heading */}
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center my-6"
            >
                My Volunteer Request Posts
            </motion.h2>

            {/* My Requests Table */}
            {myRequests.length === 0 ? (
                <div className="text-center py-10">
                    <p className={`text-xl font-semibold ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Be a Volunteer
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className={`table w-full border-collapse border ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
                        <thead className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Deadline</th>
                                <th>Suggestion</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                            {myRequests.map((req, index) => (
                                <motion.tr
                                    key={req._id}
                                    custom={index}
                                    variants={fadeInVariant}
                                    initial="hidden"
                                    animate="visible"
                                    className={`border-t ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
                                >
                                    <td>{index + 1}</td>
                                    <td>{req.title}</td>
                                    <td>{req.location}</td>
                                    <td>{req.deadline}</td>
                                    <td>{req.suggestion}</td>
                                    <td className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleCancelRequest(req._id)}
                                            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManagePosts;

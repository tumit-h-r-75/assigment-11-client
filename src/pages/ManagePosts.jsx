import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

const ManagePosts = () => {
    const { user } = useAuth();
    const [myPosts, setMyPosts] = useState([]);
    const [myRequests, setMyRequests] = useState([]);


    // Load posts by user email
    useEffect(() => {
        // fro my volunteer needs posts
        fetch(`http://localhost:3000/my-volunteer-needs?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMyPosts(data));

        // fro my volunteer needs posts
        fetch(`http://localhost:3000/my-volunteer-requests?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMyRequests(data));

    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/my-volunteer-needs/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });
                            const remainingPost = myPosts.filter(item => item._id !== id);
                            setMyPosts(remainingPost)
                        }
                    })

            }
        });
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* for my volunteer need post  */}
            <h2 className="text-3xl font-bold text-center mb-6">My Volunteer Need Posts</h2>

            {myPosts?.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    <p>You haven't added any volunteer posts yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border">#</th>
                                <th className="border">Thumbnail</th>
                                <th className="border">Title</th>
                                <th className="border">Category & Location</th>
                                <th className="border">Volunteers</th>
                                <th className="border">Deadline</th>
                                <th className="border">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-200">
                            {myPosts.map((post, index) => (
                                <tr key={post._id} className="border-t">
                                    <td className="border">{index + 1}</td>
                                    <td className="border">
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="border" >{post.title}</td>
                                    <td className="border">
                                        {post.category} <br />
                                        <span className="text-sm text-gray-500">{post.location}</span>
                                    </td>
                                    <td className="border">{post.volunteersNeeded}</td>
                                    <td className="border">{post.deadline}</td>
                                    <td className="border">
                                        <div className="flex flex-col gap-2">
                                            <button className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="btn btn-sm bg-red-600 hover:bg-red-700 text-white">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* for volunteer request */}
            <h2 className="text-2xl font-bold text-center mt-20">My Volunteer Request Posts</h2>
            {
                myRequests.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        <p>No requests found</p>
                    </div>
                ) :
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border">#</th>
                                <th className="border">Title</th>
                                <th className="border">Location</th>
                                <th className="border">Deadline</th>
                                <th className="border">Suggestion</th>
                                <th className="border">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-200">
                            {
                                myRequests.map((req, index) => (
                                    <tr key={req._id}>
                                        <td className="border">{index + 1}</td>
                                        <td className="border overflow-hidden">{req.title}</td>
                                        <td className="border">{req.location}</td>
                                        <td className="border">{req.deadline}</td>
                                        <td className="border">{req.suggestion}</td>
                                        <td className="border">
                                            <button className="btn btn-sm btn-error">Cancel</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
};

export default ManagePosts;

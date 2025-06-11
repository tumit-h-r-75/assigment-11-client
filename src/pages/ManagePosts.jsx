import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const ManagePosts = () => {
    const [myPosts, setMyPosts] = useState([]);
    const { user } = useAuth();

    // Load posts by user email
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/my-volunteer-needs?email=${user?.email}`)
                .then(res => res.json())
                .then(data => setMyPosts(data))
                .catch(err => console.error("Failed to load posts:", err));
        }
    }, [user?.email]);

    return (
        <div className="max-w-7xl mx-auto p-4">
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
                                        <div className="flex gap-2">
                                            <button className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white">
                                                Edit
                                            </button>
                                            <button className="btn btn-sm bg-red-600 hover:bg-red-700 text-white">
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
        </div>
    );
};

export default ManagePosts;

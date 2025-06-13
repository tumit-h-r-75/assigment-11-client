import { useEffect, useState, useContext } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router"; 
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";

const ManagePosts = () => {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const { theme } = useContext(AuthContext);(AuthContext)

  // Load posts by user email
  useEffect(() => {
    if (user?.email) {
      fetch(`https://volunteer-hub-server-fawn.vercel.app/my-volunteer-needs?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyPosts(data));

      fetch(`https://volunteer-hub-server-fawn.vercel.app/my-volunteer-requests?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyRequests(data));
    }
  }, [user]);

  // handle delete for posts
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
            Swal.fire({
              title: "Deleted!",
              text: "Your post has been deleted.",
              icon: "success",
            });
            const remainingPost = myPosts.filter((item) => item._id !== id);
            setMyPosts(remainingPost);
          }
        });
      }
    });
  };

  // handle Cancel for Request
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
            Swal.fire({
              title: "Canceled!",
              text: "Your Request has been Canceled.",
              icon: "success",
            });
            const remainingRequest = myRequests.filter((item) => item._id !== id);
            setMyRequests(remainingRequest);
          }
        });
      }
    });
  };

  return (
    <div
      className={`max-w-7xl mx-auto p-4 ${
        theme === "dark" ? " text-gray-200" : " text-gray-900"
      }`}
    >
      <Helmet>
        <title>VolunteerHub || ManageDetails</title>
      </Helmet>

      {/* My Volunteer Need Posts */}
      <h2 className="text-3xl font-bold text-center my-6">My Volunteer Need Posts</h2>

      {myPosts?.length === 0 ? (
        <div className="text-center py-10">
          <p className={`text-xl font-semibold ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            You haven't added any volunteer posts yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table
            className={`table w-full border-collapse border ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <thead className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
              <tr>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>#</th>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>Thumbnail</th>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>Title</th>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
                  Category & Location
                </th>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>Volunteers</th>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>Deadline</th>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
              {myPosts.map((post, index) => (
                <tr key={post._id} className={`border-t ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                  <td className={`border px-3 py-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {index + 1}
                  </td>
                  <td className={`border px-3 py-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    <img src={post.thumbnail} alt={post.title} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className={`border px-3 py-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {post.title}
                  </td>
                  <td className={`border px-3 py-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {post.category} <br />
                    <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-sm`}>
                      {post.location}
                    </span>
                  </td>
                  <td className={`border px-3 py-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {post.volunteersNeeded}
                  </td>
                  <td className={`border px-3 py-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {post.deadline}
                  </td>
                  <td
                    className={`border px-3 py-2 flex flex-col gap-2 ${
                      theme === "dark" ? "border-gray-600" : "border-gray-300"
                    }`}
                  >
                    <Link
                      className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white"
                      to={`/update-data/${post._id}`}
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={`divider my-10 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>and</div>

      {/* My Volunteer Requests */}
      <h2 className="text-3xl font-bold text-center my-6">My Volunteer Request Posts</h2>

      {myRequests.length === 0 ? (
        <div className="text-center py-10">
          <p className={`text-xl font-semibold ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Be a Volunteer
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table
            className={`table w-full border-collapse border ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <thead className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
              <tr>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>#</th>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>Title</th>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>Location</th>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>Deadline</th>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>Suggestion</th>
                <th className={`border px-3 py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
              {myRequests.map((req, index) => (
                <tr key={req._id} className={`border-t ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                  <td className={`border px-3 py-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>{index + 1}</td>

                  {/* FIXED: Correct closing tag and removed invalid characters */}
                  <td className={`border px-3 py-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"} overflow-hidden`}>
                    {req.title}
                  </td>

                  <td className={`border px-3 py-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {req.location}
                  </td>

                  <td className={`border px-3 py-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {req.deadline}
                  </td>

                  <td className={`border px-3 py-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {req.suggestion}
                  </td>

                  <td
                    className={`border px-3 py-2 flex flex-col gap-2 ${
                      theme === "dark" ? "border-gray-600" : "border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => handleCancelRequest(req._id)}
                      className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                    >
                      Cancel
                    </button>
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

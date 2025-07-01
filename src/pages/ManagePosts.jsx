import { useEffect, useState, useContext } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router";
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

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
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(AuthContext);
  const isDark = theme === "dark";

  useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem("accessToken");

      const fetchData = async () => {
        try {
          const [postsRes, requestsRes] = await Promise.all([
            fetch(
              `https://volunteer-hub-server-fawn.vercel.app/my-volunteer-needs?email=${user.email}`,
              {
                headers: {
                  "content-type": "application/json",
                  authorization: `Bearer ${token}`,
                },
              }
            ),
            fetch(
              `https://volunteer-hub-server-fawn.vercel.app/my-volunteer-requests?email=${user.email}`,
              {
                headers: {
                  "content-type": "application/json",
                  authorization: `Bearer ${token}`,
                },
              }
            ),
          ]);

          if (!postsRes.ok || !requestsRes.ok) {
            throw new Error("Something went wrong");
          }

          const postsData = await postsRes.json();
          const requestsData = await requestsRes.json();

          setMyPosts(postsData);
          setMyRequests(requestsData);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
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
        axios
          .delete(
            `https://volunteer-hub-server-fawn.vercel.app/my-volunteer-needs/${id}`
          )
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your post has been deleted.", "success");
              setMyPosts(myPosts.filter((item) => item._id !== id));
            }
          });
      }
    });
  };

  const handleCancelRequest = (id) => {
    Swal.fire({
      title: "Cancel Request?",
      text: "Do you want to cancel your request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://volunteer-hub-server-fawn.vercel.app/my-volunteer-requests/${id}`
          )
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Canceled!", "Your request has been canceled.", "success");
              setMyRequests(myRequests.filter((item) => item._id !== id));
            }
          });
      }
    });
  };

  return (
    <div
      className={`max-w-7xl mx-auto p-4 ${
        isDark ? "text-gray-200" : "text-gray-900"
      }`}
    >
      <Helmet>
        <title>VolunteerHub || ManagePosts</title>
      </Helmet>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader />
        </div>
      ) : (
        <>
          {/* My Volunteer Need Posts */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center my-6"
          >
            My Volunteer Need Posts
          </motion.h2>

          {myPosts.length === 0 ? (
            <p className="text-center text-lg italic opacity-70 py-10">
              You have not created any volunteer posts yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table
                className={`table w-full border-collapse border ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <thead className={isDark ? "bg-gray-800" : "bg-gray-100"}>
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
                <tbody className={isDark ? "bg-gray-700" : "bg-gray-200"}>
                  {myPosts.map((post, index) => (
                    <motion.tr
                      key={post._id}
                      custom={index}
                      variants={fadeInVariant}
                      initial="hidden"
                      animate="visible"
                      className={`border-t ${
                        isDark ? "border-gray-600" : "border-gray-300"
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td>{post.title}</td>
                      <td>
                        {post.category}
                        <br />
                        <span className="text-sm">{post.location}</span>
                      </td>
                      <td>{post.volunteersNeeded}</td>
                      <td>{post.deadline}</td>
                      <td className="flex flex-col gap-2 min-w-[120px]">
                        <Link
                          to={`/update-data/${post._id}`}
                          className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white"
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
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div
            className={`divider my-10 ${
              isDark ? "border-gray-600" : "border-gray-300"
            }`}
          >
            and
          </div>

          {/* My Volunteer Requests */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center my-6"
          >
            My Volunteer Request Posts
          </motion.h2>

          {myRequests.length === 0 ? (
            <p className="text-center text-lg italic opacity-70 py-10">
              You haven't requested to volunteer for any posts yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table
                className={`table w-full border-collapse border ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <thead className={isDark ? "bg-gray-800" : "bg-gray-100"}>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Deadline</th>
                    <th>Suggestion</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className={isDark ? "bg-gray-700" : "bg-gray-200"}>
                  {myRequests.map((req, index) => (
                    <motion.tr
                      key={req._id}
                      custom={index}
                      variants={fadeInVariant}
                      initial="hidden"
                      animate="visible"
                      className={`border-t ${
                        isDark ? "border-gray-600" : "border-gray-300"
                      }`}
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
        </>
      )}
    </div>
  );
};

export default ManagePosts;

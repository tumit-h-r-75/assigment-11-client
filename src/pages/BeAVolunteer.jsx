import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const BeAVolunteer = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = use(AuthContext);

  useEffect(() => {
    fetch(`https://volunteer-hub-server-fawn.vercel.app/volunteer/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const suggestion = form.suggestion.value;

    const requestData = {
      postId: id,
      title: post.title,
      thumbnail: post.thumbnail,
      description: post.description,
      category: post.category,
      location: post.location,
      deadline: post.deadline,
      organizerName: post.organizerName,
      organizerEmail: post.organizerEmail,
      volunteerName: user?.displayName,
      volunteerEmail: user?.email,
      suggestion,
      status: "requested"
    };

    axios.post('https://volunteer-hub-server-fawn.vercel.app/request-volunteer', requestData)
      .then(res => {
        if (res.data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'Volunteer request submitted',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          navigate(`/detials/${post._id}`);
        } else {
          Swal.fire({
            title: 'Failed!',
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Request failed.");
      });
  };

  if (!post) return <Loader />;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`max-w-3xl mx-auto space-y-4 p-5 rounded-lg shadow ${theme === "dark"
        ? "bg-gray-700 text-white border-gray-600"
        : "bg-white text-black border-gray-300"
        }`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Helmet>
        <title>VolunteerHub || Be A Volunteer</title>
      </Helmet>

      <motion.h2
        className="text-2xl font-bold text-center mb-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Volunteer Request
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {[
          post.title,
          post.category,
          post.location,
          post.deadline,
          post.organizerName,
          post.organizerEmail,
          user?.displayName,
          user?.email,
        ].map((value, index) => (
          <motion.input
            key={index}
            readOnly
            value={value}
            className="input input-bordered"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>

      <motion.textarea
        name="suggestion"
        placeholder="Any suggestion..."
        className="textarea textarea-bordered w-full"
        required
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      ></motion.textarea>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        Request
      </motion.button>
    </motion.form>
  );
};

export default BeAVolunteer;

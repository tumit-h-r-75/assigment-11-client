import React, { useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5 }
    }),
};

const AddPost = () => {
    const { user, theme } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(null);

    const isDark = theme === 'dark';

    const handleAddPost = (e) => {
        e.preventDefault();
        const form = e.target;

        const newPost = {
            thumbnail: form.thumbnail.value,
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            location: form.location.value,
            volunteersNeeded: parseInt(form.volunteers.value),
            deadline: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
            organizerName: user?.displayName,
            organizerEmail: user?.email
        };

        axios.post('https://volunteer-hub-server-fawn.vercel.app/volunteer', newPost)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Post added successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    form.reset();
                    setSelectedDate(null);
                } else {
                    Swal.fire({
                        title: 'Failed!',
                        text: 'Post could not be added!',
                        icon: 'error',
                        confirmButtonText: 'Try Again'
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.message || 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            });
    };

    return (
        <div className={`max-w-3xl mx-auto px-6 py-12 rounded-xl shadow-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <Helmet>
                <title>VolunteerHub || AddPost</title>
            </Helmet>

            <motion.h2
                className={`text-3xl font-extrabold mb-10 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Add Volunteer Need Post
            </motion.h2>

            <motion.form
                onSubmit={handleAddPost}
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                {/* Input Classes */}
                {[
                    { name: 'thumbnail', type: 'url', placeholder: 'Thumbnail Image URL' },
                    { name: 'title', type: 'text', placeholder: 'Post Title' },
                    { name: 'location', type: 'text', placeholder: 'Location' },
                    { name: 'volunteers', type: 'number', placeholder: 'Number of Volunteers Needed' }
                ].map((input, idx) => (
                    <motion.input
                        key={idx}
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        required
                        className={`input input-bordered w-full rounded-md 
                            ${isDark
                                ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400'
                                : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500'}
                            focus:ring-4 focus:ring-blue-500 focus:outline-none transition`}
                        variants={fadeIn}
                    />
                ))}

                {/* Description */}
                <motion.textarea
                    name="description"
                    placeholder="Description"
                    required
                    rows={5}
                    className={`textarea textarea-bordered w-full rounded-md resize-none
                        ${isDark
                            ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400'
                            : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500'}
                        focus:ring-4 focus:ring-blue-500 focus:outline-none transition`}
                    variants={fadeIn}
                />

                {/* Category Select */}
                <motion.select
                    name="category"
                    required
                    className={`select select-bordered w-full rounded-md
                        ${isDark
                            ? 'bg-gray-800 text-white border-gray-700'
                            : 'bg-gray-50 text-gray-900 border-gray-300'}
                        focus:ring-4 focus:ring-blue-500 focus:outline-none transition`}
                    defaultValue=""
                    variants={fadeIn}
                >
                    <option value="" disabled>Select Category</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Social Service</option>
                    <option>Animal Welfare</option>
                </motion.select>

                {/* Deadline */}
                <motion.div className="grid" variants={fadeIn}>
                    <label className={`mb-2 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Deadline
                    </label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select deadline"
                        className={`input input-bordered w-full rounded-md
                            ${isDark
                                ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400'
                                : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500'}
                            focus:ring-4 focus:ring-blue-500 focus:outline-none transition`}
                        required
                        minDate={new Date()}
                    />
                </motion.div>

                {/* Organizer Info */}
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={fadeIn}>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        className={`input input-bordered w-full rounded-md
                            ${isDark
                                ? 'bg-gray-700 text-gray-200 border-gray-600'
                                : 'bg-gray-100 text-gray-700 border-gray-300'}
                            cursor-not-allowed`}
                        placeholder="Organizer Name"
                    />
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className={`input input-bordered w-full rounded-md
                            ${isDark
                                ? 'bg-gray-700 text-gray-200 border-gray-600'
                                : 'bg-gray-100 text-gray-700 border-gray-300'}
                            cursor-not-allowed`}
                        placeholder="Organizer Email"
                    />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-lg
                               transition duration-300 focus:ring-4 focus:ring-blue-400 focus:outline-none"
                    variants={fadeIn}
                >
                    Add Post
                </motion.button>
            </motion.form>
        </div>
    );
};

export default AddPost;

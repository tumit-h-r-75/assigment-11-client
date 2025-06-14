import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const UpdatePost = () => {
    const updatedData = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date(updatedData.deadline));

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatePost = {
            thumbnail: form.thumbnail.value,
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            location: form.location.value,
            volunteersNeeded: parseInt(form?.volunteersNeeded?.value),
            deadline: form?.deadline?.value,
            organizerName: user?.displayName,
            organizerEmail: user?.email
        };

        axios.patch(`https://volunteer-hub-server-fawn.vercel.app/volunteer/${updatedData._id}`, updatePost)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your data has been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(`/detials/${updatedData._id}`);
                }
            });
    };

    const inputVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1 }
        }),
    };

    return (
        <motion.div
            className="max-w-3xl mx-auto p-6 mt-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Helmet>
                <title>VolunteerHub || Update</title>
            </Helmet>

            <motion.h2
                className="text-2xl font-bold text-center mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                Update Volunteer Post
            </motion.h2>

            <form onSubmit={handleUpdate} className="space-y-4">
                {[
                    {
                        label: "Thumbnail",
                        name: "thumbnail",
                        defaultValue: updatedData.thumbnail,
                        type: "text",
                        placeholder: "Thumbnail URL"
                    },
                    {
                        label: "Title",
                        name: "title",
                        defaultValue: updatedData.title,
                        type: "text",
                        placeholder: "Post Title"
                    },
                    {
                        label: "Description",
                        name: "description",
                        defaultValue: updatedData.description,
                        type: "textarea",
                        placeholder: "Description"
                    },
                    {
                        label: "Category",
                        name: "category",
                        defaultValue: updatedData.category,
                        type: "select",
                        options: ["Education", "Healthcare", "Social Service", "Animal Welfare"]
                    },
                    {
                        label: "Location",
                        name: "location",
                        defaultValue: updatedData.location,
                        type: "text",
                        placeholder: "Location"
                    },
                    {
                        label: "Volunteers Needed",
                        name: "volunteersNeeded",
                        defaultValue: updatedData.volunteersNeeded,
                        type: "number",
                        placeholder: "Number of Volunteers"
                    }
                ].map((field, i) => (
                    <motion.div key={i} custom={i} variants={inputVariants} initial="hidden" animate="visible">
                        <label className="font-medium mb-2 block">{field.label}</label>
                        {field.type === "textarea" ? (
                            <textarea
                                name={field.name}
                                defaultValue={field.defaultValue}
                                placeholder={field.placeholder}
                                className="textarea textarea-bordered w-full"
                                required
                            ></textarea>
                        ) : field.type === "select" ? (
                            <select
                                name={field.name}
                                defaultValue={field.defaultValue}
                                className="select select-bordered w-full"
                                required
                            >
                                {field.options.map((opt, idx) => (
                                    <option key={idx} value={opt}>{opt}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                name={field.name}
                                defaultValue={field.defaultValue}
                                type={field.type}
                                placeholder={field.placeholder}
                                className="input input-bordered w-full"
                                required
                            />
                        )}
                    </motion.div>
                ))}

                <motion.div custom={7} variants={inputVariants} initial="hidden" animate="visible" className="grid">
                    <label className="font-medium mb-2 block">Deadline</label>
                    <DatePicker
                        selected={selectedDate}
                        name="deadline"
                        onChange={(date) => setSelectedDate(date)}
                        className="input input-bordered w-full"
                        dateFormat="yyyy-MM-dd"
                        required
                    />
                </motion.div>

                <motion.div custom={8} variants={inputVariants} initial="hidden" animate="visible">
                    <label className="font-medium mb-2 block">User Name</label>
                    <input
                        value={user?.displayName}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </motion.div>

                <motion.div custom={9} variants={inputVariants} initial="hidden" animate="visible">
                    <label className="font-medium mb-2 block">User Email</label>
                    <input
                        value={user?.email}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </motion.div>

                <motion.button
                    type="submit"
                    className="btn btn-primary w-full mt-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Update Post
                </motion.button>
            </form>
        </motion.div>
    );
};

export default UpdatePost;

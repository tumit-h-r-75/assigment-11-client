import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdatePost = () => {

    const updatedData = useLoaderData()
    const { user } = useAuth();
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(new Date(updatedData.deadline));

    const handleUpdate =( e )=> {
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
        console.log(updatePost);
        axios.patch(`http://localhost:3000/volunteer/${updatedData._id}`, updatePost)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your data has been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(`/detials/${updatedData._id}`)
                }
            })
    }

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Update Volunteer Post</h2>
            <form onSubmit={handleUpdate} className="space-y-4">

                <div>
                    <label className="font-medium mb-2 block">Thumbnail</label>
                    <input
                        name="thumbnail"
                        defaultValue={updatedData.thumbnail}
                        type="text"
                        placeholder="Thumbnail URL"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <label className="font-medium mb-2 block">Title</label>
                    <input
                        name="title"
                        defaultValue={updatedData.title}
                        type="text"
                        placeholder="Post Title"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <label className="font-medium mb-2 block">Description</label>
                    <textarea
                        name="description"
                        defaultValue={updatedData.description}
                        placeholder="Description"
                        className="textarea textarea-bordered w-full"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="font-medium mb-2 block">Category</label>
                    <select
                        name="category"
                        defaultValue={updatedData.category}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Social Service">Social Service</option>
                        <option value="Animal Welfare">Animal Welfare</option>
                    </select>
                </div>

                <div>
                    <label className="font-medium mb-2 block">Location</label>
                    <input
                        name="location"
                        defaultValue={updatedData.location}
                        type="text"
                        placeholder="Location"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <label className="font-medium mb-2 block">Volunteers Needed</label>
                    <input
                        name="volunteersNeeded"
                        defaultValue={updatedData.volunteersNeeded}
                        type="number"
                        placeholder="Number of Volunteers"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className='grid'>
                    <label className="font-medium mb-2 block">Deadline</label>
                    <DatePicker
                        selected={selectedDate}
                        name="deadline"
                        onChange={(date) => setSelectedDate(date)}
                        className="input input-bordered w-full"
                        dateFormat="yyyy-MM-dd"
                        required
                    />
                </div>

                <div>
                    <label className="font-medium mb-2 block">User Name</label>
                    <input
                        value={user?.displayName}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <div>
                    <label className="font-medium mb-2 block">User Email</label>
                    <input
                        value={user?.email}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default UpdatePost;
import React, { useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet';

const AddPost = () => {
    const { user } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(null);

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
            deadline: form.deadline.value,
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
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Helmet>
                <title>VolunteerHub || AddPost</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-6 text-center">Add Volunteer Need Post</h2>
            <form onSubmit={handleAddPost} className="space-y-4">
                <input type="text" name="thumbnail" placeholder="Thumbnail URL" required className="input input-bordered w-full" />
                <input type="text" name="title" placeholder="Post Title" required className="input input-bordered w-full" />
                <textarea name="description" placeholder="Description" required className="textarea textarea-bordered w-full" rows={4}></textarea>
                <select name="category" required className="select select-bordered w-full">
                    <option disabled selected>Select Category</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Social Service</option>
                    <option>Animal Welfare</option>
                </select>
                <input type="text" name="location" placeholder="Location" required className="input input-bordered w-full" />
                <input type="number" name="volunteers" placeholder="No. of Volunteers Needed" required className="input input-bordered w-full" />

                <div className='grid '>
                    <label className="mb-2 font-medium">Deadline</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        name='deadline'
                        placeholderText="Select deadline"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={user?.displayName || ''} readOnly className="input input-bordered w-full" />
                    <input type="email" value={user?.email || ''} readOnly className="input input-bordered w-full" />
                </div>

                <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white w-full">Add Post</button>
            </form>
        </div>
    );
};

export default AddPost;

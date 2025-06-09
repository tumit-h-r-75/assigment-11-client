import React, { useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

const AddPost = () => {
    const { user } = useContext(AuthContext);

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

        axios.post('https://volunteer-hub-server-dun.vercel.app/volunteer', newPost)
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

                <div>
                    <label className="mb-1 font-medium">Deadline</label>
                    <input type="date" name="deadline" required className="input input-bordered w-full" />
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

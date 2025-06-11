import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';

const BeAVolunteer = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/volunteer/${id}`)
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

        axios.post('http://localhost:3000/request-volunteer', requestData)
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
                Swal.fire( "Request failed.", );
            });
    };

    if (!post) return <Loader></Loader>;

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold">Volunteer Request</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input readOnly value={post.title} className="input input-bordered" />
                <input readOnly value={post.category} className="input input-bordered" />
                <input readOnly value={post.location} className="input input-bordered" />
                <input readOnly value={post.deadline} className="input input-bordered" />
                <input readOnly value={post.organizerName} className="input input-bordered" />
                <input readOnly value={post.organizerEmail} className="input input-bordered" />
                <input readOnly value={user?.displayName} className="input input-bordered" />
                <input readOnly value={user?.email} className="input input-bordered" />
            </div>

            <textarea
                name="suggestion"
                placeholder="Any suggestion..."
                className="textarea textarea-bordered w-full"
                required
            ></textarea>

            <button type="submit" className="btn btn-primary w-full">Request</button>
        </form>
    );
};

export default BeAVolunteer;

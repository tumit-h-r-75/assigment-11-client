import React, { Suspense, useEffect, useState } from 'react';
import AllCard from '../components/AllCard';
import Loader from '../components/Loader';
import { Helmet } from 'react-helmet';

const AllPosts = () => {
    const [AllPostsPromise, setAllPostsPromise] = useState()
    useEffect(() => {
        fetch('https://volunteer-hub-server-fawn.vercel.app/volunteer')
            .then(res => res.json())
            .then(data => {
                setAllPostsPromise(data);
            })
    },[])



    return (
        <div>
            <Helmet>
                <title>VolunteerHub || Allposts</title>
            </Helmet>
            <section>
                <AllCard AllPostsPromise={AllPostsPromise}></AllCard>
            </section>
        </div>
    );
};

export default AllPosts;
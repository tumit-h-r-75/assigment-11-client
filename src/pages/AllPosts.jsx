import React, { Suspense, useEffect, useState } from 'react';
import AllCard from '../components/AllCard';
import Loader from '../components/Loader';

const AllPosts = () => {
    const [AllPostsPromise, setAllPostsPromise] = useState()
    useEffect(() => {
        fetch('https://volunteer-hub-server-dun.vercel.app/volunteer')
            .then(res => res.json())
            .then(data => {
                setAllPostsPromise(data);
            })
    },[])



    return (
        <div>
            <section>
                <AllCard AllPostsPromise={AllPostsPromise}></AllCard>
            </section>
        </div>
    );
};

export default AllPosts;
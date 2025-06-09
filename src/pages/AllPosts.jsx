import React, { Suspense } from 'react';
import AllCard from '../components/AllCard';
import Loader from '../components/Loader';

const AllPosts = () => {

    const AllPostsPromise = fetch('https://volunteer-hub-server-dun.vercel.app/volunteer').then(res => res.json())


    return (
        <div>
            <section>
                <Suspense fallback={<Loader></Loader>}>
                    <AllCard AllPostsPromise={AllPostsPromise}></AllCard>
                </Suspense>
            </section>
        </div>
    );
};

export default AllPosts;
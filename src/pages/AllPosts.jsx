import React, { Suspense } from 'react';
import AllCard from '../components/AllCard';
import Loader from '../components/Loader';

const AllPosts = () => {

    const AllPostsPromise = fetch('http://localhost:3000/volunteer').then(res => res.json())


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
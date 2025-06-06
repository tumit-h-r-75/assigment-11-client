import React, { Suspense } from 'react';
import Banner from '../components/Banner';
import VolunteerNeed from '../components/VolunteerNeed';


const Home = () => {
    return (
        <div>
            <section>
                <Banner></Banner>
            </section>
            <section>
                <Suspense fallback={'loading.....!'} ><VolunteerNeed></VolunteerNeed></Suspense>
            </section>
        </div>
    );
};

export default Home;
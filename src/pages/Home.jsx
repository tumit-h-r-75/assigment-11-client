import React, { Suspense } from 'react';
import Banner from '../components/Banner';
import VolunteerNeed from '../components/VolunteerNeed';
import Loader from '../components/Loader';


const Home = () => {
    const VolunteerNeedPromise = fetch('https://volunteer-hub-server-dun.vercel.app/api/needs').then(res => res.json())
    return (
        <div>
            <section>
                <Banner></Banner>
            </section>
            <section>
                <Suspense fallback={<Loader></Loader>} >
                    <VolunteerNeed VolunteerNeedPromise={VolunteerNeedPromise} ></VolunteerNeed>
                </Suspense>
            </section>
        </div>
    );
};

export default Home;
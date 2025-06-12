import React, { Suspense } from 'react';
import Banner from '../components/Banner';
import VolunteerNeed from '../components/VolunteerNeed';
import Loader from '../components/Loader';
import { Helmet } from 'react-helmet';


const Home = () => {
    const VolunteerNeedPromise = fetch('http://localhost:3000/api/needs').then(res => res.json())
    return (
        <div>
            <Helmet>
                <title>VolunteerHub || Home</title>
            </Helmet>
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
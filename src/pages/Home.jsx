import React, { Suspense } from 'react';
import Banner from '../components/Banner';
import VolunteerNeed from '../components/VolunteerNeed';
import Loader from '../components/Loader';
import { Helmet } from 'react-helmet';
import VolunteerImpactStats from '../components/VolunteerImpactStats';
import VolunteerBenefits from '../components/VolunteerBenefits';


const Home = () => {
    const VolunteerNeedPromise = fetch('https://volunteer-hub-server-fawn.vercel.app/volunteer').then(res => res.json())
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
            <section>
                <VolunteerBenefits></VolunteerBenefits>
            </section>
            <section>
                <VolunteerImpactStats></VolunteerImpactStats>
            </section>
        </div>
    );
};

export default Home;
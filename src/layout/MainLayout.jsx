import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import bgImage from '../assets/mainLayout-bg.avif';

const MainLayout = () => {
    return (
        <div>
            <ToastContainer position="top-right" />
            <header>
                <Navbar />
            </header>
            <main>
                <section
                    className="max-w-7xl mx-auto p-5 min-h-screen"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    <Outlet />
                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;

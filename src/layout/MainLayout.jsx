import React, { use } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div>
            <ToastContainer position="top-right" />
            <header className='sticky top-0 left-0 z-90'>
                <Navbar />
            </header>
            <main>
                <section
                    className="max-w-7xl mx-auto p-5 min-h-screen rounded-2xl my-3 "
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

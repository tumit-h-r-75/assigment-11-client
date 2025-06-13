import React, { use } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import bgImage from '../assets/bg-2.avif';
import bgImage2 from '../assets/bg-3.avif'
import { AuthContext } from '../context/AuthContext';

const MainLayout = () => {
    const { theme } = use(AuthContext);
    return (
        <div>
            <ToastContainer position="top-right" />
            <header>
                <Navbar />
            </header>
            <main>
                <section
                    className="max-w-7xl mx-auto p-5 min-h-screen rounded-2xl my-3 "
                    style={{
                        backgroundImage: `url(${theme === 'light' ? bgImage : bgImage2})`,
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

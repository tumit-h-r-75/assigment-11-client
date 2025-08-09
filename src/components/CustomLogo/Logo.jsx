import React from 'react';
import { Link } from 'react-router';
import navLogo from "../../assets/logo-1.avif";

const Logo = () => {
    return (
        <div>
             <Link to='/' className="flex items-center gap-3">
          <img src={navLogo} alt="Logo" className="w-28 md:w-36 h-20 rounded-full" />
        </Link>
        </div>
    );
};

export default Logo;
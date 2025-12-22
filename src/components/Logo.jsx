import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <div className={`${className} rounded-full overflow-hidden border border-stone-200 shadow-sm`}>
            <img
                src="/lunarose-logo.jpg"
                alt="Piya LunaRose Logo"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Logo;

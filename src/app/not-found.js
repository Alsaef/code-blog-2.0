import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-base-300 text-base-content flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-primary mb-4">
                    404
                </h1>
                <h2 className="text-4xl font-bold mb-6">
                    Page Not Found
                </h2>
                <p className="text-lg mb-8 max-w-md mx-auto">
                    Sorry, the page you're looking for might have been moved, deleted, or the link is incorrect.
                </p>
                
                <Link href="/" passHref>
                    <button className="btn btn-primary btn-lg transform transition-transform duration-300 hover:scale-105">
                        Return to Homepage
                    </button>
                </Link>

                <div className="mt-10 text-sm opacity-70">
                    <p>Or, please check the link you typed again.</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
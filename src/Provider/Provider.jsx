'use client'
import React from 'react';
import AuthProvider from './AuthProvider';

const Provider = ({children}) => {
    return (
        <div>
           <AuthProvider>
             {children}
           </AuthProvider>
        </div>
    );
};

export default Provider;
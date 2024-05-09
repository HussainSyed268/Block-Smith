import React from 'react';
import Header from './components/Navbar';
import Footer from './components/Footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <main className=' min-h-[64vh] max-sm:w-[100vw]'>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
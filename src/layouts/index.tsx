import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <div>
            {/* <div className="h-14 w-full shadow-xl bg-gray-100">
        <Header></Header>
      </div> */}
            <div className='h-full w-full'>
                <Outlet></Outlet>
            </div>
            {/* <div>
                <Footer></Footer>
            </div> */}
        </div>
    );
}

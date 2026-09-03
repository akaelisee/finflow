import SildeBar from '@/layouts/sildeBar';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='flex justify-center w-full min-h-screen bg-white'>
            <SildeBar />
            <main className="w-full mt-14 ml-32 mr-10 _relative z-10 lg:ml-[330px]">
              <Outlet />
            </main>
        </div>
    );
};
export default DashboardLayout;
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function DashboardLayout() {
  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <Sidebar />
      <main className="w-full mt-14 ml-32 mr-10 relative z-10 lg:ml-[330px]">
        <Outlet />
      </main>
    </div>
  );
}
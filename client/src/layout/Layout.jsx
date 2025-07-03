// import { useState, useEffect } from 'react';
// import { useNavigate, Outlet } from 'react-router-dom';
// import AdminSidebar from '../admin/components/AdminSidebar';
// import ClientSidebar from '../client/components/ClientSidebar';
// import AdminHeader from '../admin/components/AdminHeader';
// import ClientHeader from '../client/components/ClientHeader';

// export default function Layout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const navigate = useNavigate();

//   const role = localStorage.getItem('role');
//   const token = localStorage.getItem('token');

//  useEffect(() => {
//   if (!token) {
//     navigate('/');
//   } else {
//     console.log('Layout loaded for role:', role); // Debug
//   }
// }, [navigate, token]);


//   const SidebarComponent = role === 'admin' ? AdminSidebar : ClientSidebar;
//   const HeaderComponent = role === 'admin' ? AdminHeader : ClientHeader;

//   return (
//     <div className="flex">
//       <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
//       <div className={`flex-1 min-h-screen bg-gray-100 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-16'}`}>

//         <HeaderComponent />
//         <main className="p-5">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from '../admin/components/AdminSidebar';
import ClientSidebar from '../client/components/ClientSidebar';
import AdminHeader from '../admin/components/AdminHeader';
import ClientHeader from '../client/components/ClientHeader';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      // If trying to access wrong area, redirect
      if (role === 'admin' && !location.pathname.startsWith('/admin')) {
        navigate('/admin/dashboard');
      } else if (role === 'client' && !location.pathname.startsWith('/client')) {
        navigate('/client/dashboard');
      }
    }
  }, [navigate, token, location.pathname, role]);

  const Sidebar = role === 'admin' ? AdminSidebar : ClientSidebar;
  const Header = role === 'admin' ? AdminHeader : ClientHeader;

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`flex-1 min-h-screen bg-gray-100 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-16'}`}>
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

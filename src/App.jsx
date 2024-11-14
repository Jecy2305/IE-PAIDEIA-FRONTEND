import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/Pages/SideBar';
import SidebarUser from './Components/Pages/Users/SideBarUser';
import { useAuth } from './AuthContext';
import PreLoader from './Components/Pages/PreLoader';

function App() {
  const { user } = useAuth();
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    // Verifica si el preloader ya se mostró en sesiones previas
    const preloaderShown = localStorage.getItem('preloaderShown');
    if (!preloaderShown && user) {
      setShowPreloader(true);
      localStorage.setItem('preloaderShown', 'true');
    }
  }, [user]);

  // Layout para administradores
  const AdminLayout = () => (
    <main className="admin-layout">
      <Sidebar />
      <div className="content">
        {showPreloader && <PreLoader name={user.nombreCompleto}></PreLoader>}
        <Outlet />
      </div>
    </main>
  );

  // Layout para usuarios normales
  const UserLayout = () => (
    <main className="user-layout">
      <SidebarUser />
      <div className="content">
        {showPreloader && <PreLoader name={user.nombreCompleto}></PreLoader>}
        <Outlet />
      </div>
    </main>
  );

  // Renderiza el layout correspondiente según el rol
  return user?.rolId === 3 ? <AdminLayout /> : <UserLayout />;
}

export default App;

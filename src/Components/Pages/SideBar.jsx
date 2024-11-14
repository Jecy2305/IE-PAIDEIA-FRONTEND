import {NavLink} from "react-router-dom";
import {
  Book,
  BookOpen,
  Users,
  BarChart2,
  Calendar,
  FileText,
  Library,
  Outdent,
  LogOut,
} from "lucide-react";
import "./SideBar.css";


function Sidebar() {

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('preloaderShown')
    navigate('/login'); // Redirige a la página de login
  }


  return (
    <>
    <aside>
      <div className="sidebar-header">
        <Library />
        <h2>BiblioEscolar</h2>
      </div>

      <nav>

        <ul>
          
          
            
            <NavLink to="/dashboard" className="navLink">
              <BarChart2 />
              Dashboard
            </NavLink>
          
        
            
            <NavLink to="/libros" className="navLink">
              <Book />
              Libros
            </NavLink>
                    
        
      
            <NavLink to="/usuarios" className="navLink">
              <Users />
              Usuarios
            </NavLink>
          
        
            {/* <NavLink to="/reportes" className="navLink">
  <BarChart2 />
  Reportes
</NavLink> */}

          
        
            <NavLink to="/prestamos" className="navLink">
              <Calendar />
              Prestamos
            </NavLink>
          
        
            <NavLink to="/recursos" className="navLink">
              <FileText />
              Recursos Digitales
            </NavLink>

            <NavLink to="/" className="navLink" onClick={handleLogout} id="LogOut">
              <LogOut />
              Cerrar Sesion
            </NavLink>

            
          
        </ul>
      </nav>
    </aside>

    
    </>
  );
}

export default Sidebar;

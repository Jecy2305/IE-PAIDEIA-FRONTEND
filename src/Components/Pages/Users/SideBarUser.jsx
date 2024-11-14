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
  HomeIcon,
  LogOut,
} from "lucide-react";
import "../SideBar.css";


function SidebarUser() {

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('recommendedBooks');
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
          
          
            
            <NavLink to="/home" className="navLink">
              <HomeIcon />
              Inicio
            </NavLink>
          
        
            
            <NavLink to="/libros-user" className="navLink">
              <Book />
              Libros
            </NavLink>
          
        
            <NavLink to="/recomendaciones-user" className="navLink">
              <BookOpen />
              Recomendaciones
            </NavLink>
                    
        
            <NavLink to="/prestamos-user" className="navLink">
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

export default SidebarUser;

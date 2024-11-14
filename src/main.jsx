import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import LibrosContent from './Components/Pages/LibrosContent.jsx'
import DashboardContent from './Components/Pages/DashboardContent.jsx'
import UsersContent from './Components//Pages/UsersContent.jsx'
import Login from './Components/login/Login.jsx'
import RecursosContent from './Components/Pages/RecursosContent.jsx'
import UserMain from './Components/Pages/Users/UserMain.jsx'
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider, useAuth } from './AuthContext.jsx'
import { Navigate } from 'react-router-dom'
import PrestamosContent from './Components/Pages/PrestamosContent.jsx'
import UserHome from './Components/Pages/Users/UserHome.jsx'
import UserPrestamos from './Components/Pages/Users/UserPrestamos.jsx'
import RecomendacionesUser from './Components/Pages/Users/RecomendacionesUser.jsx'

// Componente para manejar la redirección condicional
const ConditionalRedirect = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ConditionalRedirect />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      // Otras rutas de la aplicación
      { path: "dashboard", element: (<ProtectedRoute allowedRoles={[3, 1]}> <DashboardContent /> </ProtectedRoute>)},
      { path: "libros", element: (<ProtectedRoute allowedRoles={[3]}> <LibrosContent /> </ProtectedRoute>) },
      { path: "usuarios", element: (<ProtectedRoute allowedRoles={[3, 1]}> <UsersContent /> </ProtectedRoute>) },
      { path: "recursos", element: (<ProtectedRoute allowedRoles={[3, 1]}> <RecursosContent /> </ProtectedRoute>) },
      { path: "prestamos", element: (<ProtectedRoute allowedRoles={[3, 1]}> <PrestamosContent /> </ProtectedRoute>) },
      { path: "libros-user", element: (<ProtectedRoute allowedRoles={[3, 1]}> <UserMain /> </ProtectedRoute>) },
      { path: "prestamos-user", element:  (<ProtectedRoute allowedRoles={[1]}> <UserPrestamos /> </ProtectedRoute>)},
      { path: "recomendaciones-user", element:  (<ProtectedRoute allowedRoles={[1]}> <RecomendacionesUser /> </ProtectedRoute>)},
      { path: "home", element:  (<ProtectedRoute allowedRoles={[1]}> <UserHome /> </ProtectedRoute>)},
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <RouterProvider router={router} />

    </AuthProvider>
  </>,
)

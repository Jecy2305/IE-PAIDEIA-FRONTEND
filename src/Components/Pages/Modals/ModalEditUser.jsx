import React, { useState, useEffect } from "react";
import "./ModalEdit.css";
import { X } from "lucide-react";

function ModalEditUser({ isOpen, onClose, user }) {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    nombreCompleto: '',
    contraseña: '',
    rolId: '',
    email: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:44307/api/Roles");
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        nombreUsuario: user.nombreUsuario || '',
        nombreCompleto: user.nombreCompleto || '',
        contraseña: user.contraseña || '',
        rolId: user.rol.rolId || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();  // Previene el comportamiento por defecto del formulario
  
    // Configuración de la solicitud
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuarioId: user.usuarioId, // Asegúrate de tener el libroId correcto desde el objeto libro
        nombreUsuario: formData.nombreUsuario,
        nombreCompleto: formData.nombreCompleto,
        contraseña: formData.contraseña,
        rolId: formData.rolId,
        email: formData.email
      })
    };
  
    try {
      const response = await fetch(`https://localhost:44307/api/Usuarios/${user.usuarioId}`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Aquí puedes manejar la respuesta. Por ejemplo, cerrar el modal y recargar los datos
      onClose(); // Cerrar el modal
      // Aquí deberías invocar cualquier función que actualice la lista de libros en el componente padre
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  
  if (!isOpen) return null;


  return (
    <div className="overlay">
      <div className="overlay__content">
        <div className="header-content">
          <div className="header-content-text">
            <h4>Editar Usuario</h4>
            <p>Modifica los detalles del usuario aquí.</p>
          </div>
          <div className="header-content-icon">
            <button className="icon-button-x" onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="nombreUsuario">
            UserName
            <input
              type="text"
              name="nombreUsuario"
              id="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={(e) => setFormData({...formData, nombreUsuario: e.target.value})}
            />
          </label>

          <label htmlFor="nombreCompleto">
            Nombres
            <input
              type="text"
              name="nombreCompleto"
              id="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={(e) => setFormData({...formData, nombreCompleto: e.target.value})}
            />
          </label>

          <label htmlFor="rolId">
            Rol
            <select
              name="rolId"
              value={formData.rolId}
              onChange={(e) => setFormData({...formData, rolId: e.target.value})}
            >
              {roles.map((rol) => (
                <option key={rol.rolId} value={rol.rolId}>
                  {rol.nombreRol}
                </option>
              ))}
            </select>
          </label>
          
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </label>

          <label htmlFor="contraseña">
            Contraseña
            <input
              type="text"
              name="contraseña"
              id="contraseña"
              value={formData.contraseña}
              onChange={(e) => setFormData({...formData, contraseña: e.target.value})}
            />
          </label>

          <button type="submit">Editar Usuario</button>
        </form>
      </div>
    </div>
  );
}

export default ModalEditUser;

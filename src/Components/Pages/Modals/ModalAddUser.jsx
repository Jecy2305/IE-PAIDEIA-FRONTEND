import React, { useState, useEffect } from "react";
import "./ModalEdit.css";
import { X } from "lucide-react";

function ModalAddUser({ isOpen, onClose }) {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    nombreCompleto: '',
    email: '',
    contraseña: '',
    rolId: '1',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBook = async () => {
    try {
      const response = await fetch('https://localhost:44307/api/Usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // Limpiar los campos después de la solicitud exitosa
        setFormData({
            nombreUsuario: '',
            nombreCompleto: '',
            email: '',
            contraseña: '',
            rolId: '1',
        });
        
      } else {
        console.error('Error en la adición de usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la adición de usuario:', error);
    }
  };

  

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="overlay__content">
        <div className="header-content">
          <div className="header-content-text">
            <h4>Añadir Nuevo Usuario</h4>
            <p>Ingresa los detalles del nuevo usuario aquí.</p>
          </div>
          <div className="header-content-icon">
            <button className="icon-button-x" onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        <form className="formulario">

        <label htmlFor="nombreUsuario">
            Username
            <input
              type="text"
              name="nombreUsuario"
              id="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={handleInputChange}
            />
          </label>  


          <label htmlFor="nombreCompleto">
            Nombres
            <input
              type="text"
              name="nombreCompleto"
              id="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="rolId">
            Rol
            <select
              name="rolId"
              value={formData.rolId}
              onChange={handleInputChange}
            >
              {roles.map((rol) => (
                <option key={rol.rolId} value={rol.rolId}>
                  {rol.nombreRol}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="email">
            Correo
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="contraseña">
            Contraseña
            <input
              type="text"
              name="contraseña"
              id="contraseña"
              value={formData.contraseña}
              onChange={handleInputChange}
            />
          </label>

          

          <button type="button" onClick={handleAddBook}>Añadir Usuario</button>
        </form>
      </div>
    </div>
  );
}

export default ModalAddUser;

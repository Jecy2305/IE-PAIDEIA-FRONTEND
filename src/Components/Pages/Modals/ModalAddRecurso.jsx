import React, { useState, useEffect } from "react";
import "./ModalEdit.css";
import { X } from "lucide-react";

function ModalAddRecurso({ isOpen, onClose, setResources, resources }) {
  const [formData, setFormData] = useState({
    titulo: '',
    url: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBook = async () => {
    try {
      const response = await fetch('https://localhost:44307/api/RecursosDigitales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        const newBook = await response.json();

        setResources([...resources, newBook]);

        // Limpiar los campos después de la solicitud exitosa
        setFormData({
          titulo: '',
          url: '',
        });
        
      } else {
        console.error('Error en la adición de libro1:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la adición de libro2:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="overlay__content">
        <div className="header-content">
          <div className="header-content-text">
            <h4>Añadir Nuevo Recurso</h4>
            <p>Ingresa los detalles del nuevo recurso aquí.</p>
          </div>
          <div className="header-content-icon">
            <button className="icon-button-x" onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        <form className="formulario">
          <label htmlFor="titulo">
            Título
            <input
              type="text"
              name="titulo"
              id="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="url">
            URL
            <input
              type="text"
              name="url"
              id="url"
              value={formData.url}
              onChange={handleInputChange}
            />
          </label>

          <button type="button" onClick={handleAddBook}>Añadir Recurso</button>
        </form>
      </div>
    </div>
  );
}

export default ModalAddRecurso;

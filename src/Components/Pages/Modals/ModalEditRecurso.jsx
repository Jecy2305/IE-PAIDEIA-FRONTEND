import React, { useState, useEffect } from "react";
import "./ModalEdit.css";
import { X } from "lucide-react";

function ModalEditRecurso({ isOpen, onClose, recurso }) {
  const [formData, setFormData] = useState({
    titulo: '',
    url: ''
  });

  useEffect(() => {
    if (recurso) {
      setFormData({
        titulo: recurso.titulo || '',
        url: recurso.url || '',
      });
    }
  }, [recurso]);

  const handleSubmit = async (e) => {
    e.preventDefault();  // Previene el comportamiento por defecto del formulario
  
    // Configuración de la solicitud
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recursoId: recurso.recursoId, // Asegúrate de tener el recursoId correcto desde el objeto libro
        titulo: formData.titulo,
        url: formData.url
      })
    };
  
    try {
      const response = await fetch(`https://localhost:44307/api/RecursosDigitales/${recurso.recursoId}`, requestOptions);
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
            <h4>Editar Recurso</h4>
            <p>Modifica los detalles del recurso aquí.</p>
          </div>
          <div className="header-content-icon">
            <button className="icon-button-x" onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="titulo">
            Titulo
            <input
              type="text"
              name="titulo"
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            />
          </label>

          <label htmlFor="url">
            URL
            <input
              type="text"
              name="url"
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
            />
          </label>

          <button type="submit">Editar Recurso</button>
        </form>
      </div>
    </div>
  );
}

export default ModalEditRecurso;

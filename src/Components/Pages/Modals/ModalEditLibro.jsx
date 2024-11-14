import React, { useState, useEffect } from "react";
import "./ModalEdit.css";
import { X } from "lucide-react";

function ModalEditLibro({ isOpen, onClose, libro }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    categoriaId: '',
    numeroCopias: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:44307/api/Categorias");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (libro) {
      setFormData({
        titulo: libro.titulo || '',
        autor: libro.autor || '',
        isbn: libro.isbn || '',
        categoriaId: libro.categoria.categoriaId || '',
        numeroCopias: libro.numeroCopias || ''
      });
    }
  }, [libro]);

  const handleSubmit = async (e) => {
    e.preventDefault();  // Previene el comportamiento por defecto del formulario
  
    // Configuración de la solicitud
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        libroId: libro.libroId, // Asegúrate de tener el libroId correcto desde el objeto libro
        titulo: formData.titulo,
        autor: formData.autor,
        isbn: formData.isbn,
        categoriaId: formData.categoriaId,
        numeroCopias: formData.numeroCopias
      })
    };
  
    try {
      const response = await fetch(`https://localhost:44307/api/Libros/${libro.libroId}`, requestOptions);
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
            <h4>Editar Libro</h4>
            <p>Modifica los detalles del libro aquí.</p>
          </div>
          <div className="header-content-icon">
            <button className="icon-button-x" onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="titulo">
            Título
            <input
              type="text"
              name="titulo"
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            />
          </label>

          <label htmlFor="autor">
            Autor
            <input
              type="text"
              name="autor"
              id="autor"
              value={formData.autor}
              onChange={(e) => setFormData({...formData, autor: e.target.value})}
            />
          </label>

          <label htmlFor="isbn">
            ISBN
            <input
              type="text"
              name="isbn"
              id="isbn"
              value={formData.isbn}
              onChange={(e) => setFormData({...formData, isbn: e.target.value})}
            />
          </label>

          <label htmlFor="categoriaId">
            Género
            <select
              name="categoriaId"
              value={formData.categoriaId}
              onChange={(e) => setFormData({...formData, categoriaId: e.target.value})}
            >
              {categories.map((category) => (
                <option key={category.categoriaId} value={category.categoriaId}>
                  {category.nombreCategoria}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="numeroCopias">
            Copias
            <input
              type="number"
              name="numeroCopias"
              id="numeroCopias"
              value={formData.numeroCopias}
              onChange={(e) => setFormData({...formData, numeroCopias: e.target.value})}
            />
          </label>

          <button type="submit">Editar Libro</button>
        </form>
      </div>
    </div>
  );
}

export default ModalEditLibro;

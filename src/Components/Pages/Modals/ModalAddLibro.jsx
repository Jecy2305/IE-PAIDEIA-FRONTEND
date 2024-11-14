import React, { useState, useEffect } from "react";
import "./ModalEdit.css";
import { X } from "lucide-react";

function ModalAddLibro({ isOpen, onClose, onAddBook }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    isbn: "",
    categoriaId: "1",
    numeroCopias: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBook = async () => {
    try {
      const response = await fetch("https://localhost:44307/api/Libros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newBook = await response.json();

        // Llama a la función onAddBook pasando el nuevo libro
        onAddBook(newBook);

        // Limpiar los campos después de la solicitud exitosa
        setFormData({
          titulo: "",
          autor: "",
          isbn: "",
          categoriaId: "1",
          numeroCopias: "",
        });

      } else {
        console.error("Error en la adición de libro:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la adición de libro:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="overlay__content">
        <div className="header-content">
          <div className="header-content-text">
            <h4>Añadir Nuevo Libro</h4>
            <p>Ingresa los detalles del nuevo libro aquí.</p>
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

          <label htmlFor="autor">
            Autor
            <input
              type="text"
              name="autor"
              id="autor"
              value={formData.autor}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="isbn">
            ISBN
            <input
              type="text"
              name="isbn"
              id="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="categoriaId">
            Género
            <select
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                  <option
                    key={category.categoriaId}
                    value={category.categoriaId}
                  >
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
              onChange={handleInputChange}
            />
          </label>

          <button type="button" onClick={handleAddBook}>
            Añadir Libro
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalAddLibro;

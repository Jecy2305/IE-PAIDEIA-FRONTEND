import React from "react";
import "./LibrosContent.css";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import ModalEditLibro from "./Modals/ModalEditLibro";
import ModalAddLibro from "./Modals/ModalAddLibro";


function LibrosContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  
  const[books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null);

  const [searchTerm, setSearchTerm] = useState('')
  
  const [categories, setCategories] = useState([]);

  useEffect(() =>{
    const fetchData = async () =>{
      try {
        const response = await fetch("https://localhost:44307/api/Libros")
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchCategories = async () => { // Añade la lógica para obtener categorías
      try {
        const response = await fetch("https://localhost:44307/api/Categorias");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchCategories(); // Llama a la función para obtener categorías
      
  }, [])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalEdit = (libro) => {
    setSelectedBook(libro); // Almacenar el libro seleccionado
    setIsModalEditOpen(true);
  };

  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };


  const filteredBooks = books.filter(book => 
    book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.autor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddBook = (newBook) => {
    // Encuentra la categoría correspondiente usando categoriaId
    const categoria = categories.find(cat => cat.categoriaId === newBook.categoriaId);
    if (categoria) {
      // Adjunta la categoría al nuevo libro
      const libroConCategoria = { ...newBook, categoria };
      setBooks(prevBooks => [...prevBooks, libroConCategoria]);
    } else {
      // Maneja el caso donde la categoría no se encuentra
      console.error('Categoría no encontrada para el nuevo libro:', newBook);
      setBooks(prevBooks => [...prevBooks, newBook]); // Añade el libro sin categoría
    }
  };

  return (
    <div className="content__modules">
      <header className="content__module-header">
        <h2>Libros</h2>
      </header>

      <div className="container__module">
        <div className="container__module__main">
          <div className="container__module__main-header">
            <header>
              <h2>Gestion de Libros</h2>
              <p>Administra el catálogo de libros de la biblioteca.</p>
            </header>
          </div>


          <ModalAddLibro isOpen={isModalOpen} onClose={closeModal} onAddBook={handleAddBook}></ModalAddLibro>

          <ModalEditLibro isOpen={isModalEditOpen} onClose={closeModalEdit} libro={selectedBook}></ModalEditLibro>

          <div className="container__module__main-search">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar Libros..."/>

            <button onClick={openModal}>
              <Plus></Plus>
              Añadir Libro
            </button>
          </div>


          <div className="container__module__main-table">
            <table>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Autor</th>
                  <th>Género</th>
                  <th>Disponibles</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredBooks.map((libro, index) => (
                  <tr key={index}>
                    <td>{libro.titulo}</td>
                    <td>{libro.autor}</td>
                    <td>{libro.categoria.nombreCategoria}</td>
                    <td>{libro.numeroCopias}</td>
                    <td>
                      <button className="icon-button" onClick={() => openModalEdit(libro)}>
                        <Edit />
                      </button>
                      <button className="icon-button">
                        <Trash2></Trash2>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibrosContent;

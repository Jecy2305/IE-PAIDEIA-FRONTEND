import { React, useState, useEffect } from 'react';
import { useAuth } from "../../../AuthContext.jsx";
import RecommendedBook from '../Modals/RecommendedBook.jsx';

function RecomendacionesUser() {
  const [books, setBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);  // Estado para las recomendaciones
  const { user } = useAuth(); // Suponiendo que 'user' contiene el género favorito

  // Obtener los libros de la API una sola vez
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:44307/api/Libros");
        const data = await response.json();
        setBooks(data);
        
        // Solo almacenamos los libros recomendados en localStorage si no están ya guardados
        if (!localStorage.getItem('recommendedBooks')) {
          // Llamamos a la función para recomendar libros
          const booksToRecommend = getRecommendedBooks(data);
          setRecommendedBooks(booksToRecommend);

          // Guardamos las recomendaciones en localStorage
          localStorage.setItem('recommendedBooks', JSON.stringify(booksToRecommend));
        } else {
          // Si ya existen las recomendaciones en localStorage, las cargamos
          setRecommendedBooks(JSON.parse(localStorage.getItem('recommendedBooks')));
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Verificar si ya hay libros recomendados en localStorage
    if (localStorage.getItem('recommendedBooks')) {
      setRecommendedBooks(JSON.parse(localStorage.getItem('recommendedBooks')));
    } else {
      fetchData();
    }
  }, []);  // Este useEffect se ejecuta solo una vez al cargar la página

  // Función para recomendar libros según el género favorito
  const getRecommendedBooks = (books) => {
    if (!user.generoFavorito) return [];  // Si no hay género favorito, no recomendaremos libros

    const preferredGenre = user.generoFavorito;  // Tomamos el género favorito del usuario

    // Filtrar libros que coincidan con el género favorito del usuario
    const genreBooks = books.filter(book => book.categoria.nombreCategoria === preferredGenre);

    // Retornamos solo los libros que coinciden con el género favorito
    return genreBooks.slice(0, 6);  // Limitar a 6 libros si es necesario
  };

  const handleSolicitarPrestamo = async (titulo) => {
    try {
      // Crear el objeto de préstamo con el formato correcto
      const nuevoPrestamo = {
        usuario: user.nombreCompleto, // Asumiendo que nombreUsuario está en el objeto user
        libro: titulo,
        fechaPrestamo: new Date().toISOString(),
        fechaDevolucion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días desde hoy
        estado: "Pendiente"
      };

      // Realizar la petición POST
      const response = await fetch("https://localhost:44307/api/Prestamos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoPrestamo),
      });

      if (response.ok) {
        alert("Solicitud de préstamo enviada correctamente");
      } else {
        const errorData = await response.json();
        alert(`Error al solicitar el préstamo: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.log(error);
      alert("Error al procesar la solicitud");
    }
  };

  return (
    <div className='content__modules'>
      <header className="content__module-header">
        <h2>Recomendaciones de Libros</h2>
      </header>

      <div className="container__module">
        <div className="container__module__main">
          <div className="container__module__main-header">
            <header>
              <h2>Seleccionamos algunos libros para ti</h2>
              <p>Las recomendaciones se basan en tu género favorito.</p>
            </header>
          </div>

          <h3>Tus géneros favoritos son: {user.generoFavorito}</h3>

          <div className="container__home__recommended-divs-rr">
            {recommendedBooks.length > 0 ? (
              recommendedBooks.map((book, index) => (
                <RecommendedBook
                  key={index}
                  titulo={book.titulo}
                  autor={book.autor}
                  numeroCopias={book.numeroCopias}
                  portadaURL={book.portadaURL}
                  nombreCategoria={book.categoria.nombreCategoria}
                  onSolicitarPrestamo={handleSolicitarPrestamo}
                />
              ))
            ) : (
              <p>No hay libros disponibles en tu género favorito.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecomendacionesUser;

import React from "react";
import bannerImg from "../../../resources/imgs/banner2.png";
import { useAuth } from "../../../AuthContext";
import { useState, useEffect } from "react";
import "./UserHome.css";
import RecommendedBook from "../Modals/RecommendedBook";
import PopularBook from "./PopularBook";
import { NavLink } from "react-router-dom";

function UserHome() {

  const[books, setBooks] = useState([])
  const { user } = useAuth();

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
    fetchData();
      
  }, [])

  // Función para seleccionar dos libros aleatorios
  const getRandomBooks = () => {
    if (books.length <= 2) return books;
    const shuffledBooks = [...books].sort(() => 0.5 - Math.random());
    return shuffledBooks.slice(0, 2);
  };

  const getPopularBooks = () => {
    // Ordena los libros de menor a mayor cantidad de copias y selecciona los primeros 3
    return [...books]
      .sort((a, b) => a.numeroCopias - b.numeroCopias)
      .slice(0, 3);
  };
  
  const popularBooks = getPopularBooks();
  

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

  

  const recommendedBooks = getRandomBooks();

  return (
    <div className="content__modules">

      <header className="content__module-header">
        <h2>Home</h2>
      </header>


      <div className="container__home">
        <div className="container__home__user">

          <div className="container__home__user-texts">
            <h2>Hola, {user.nombreCompleto}</h2>
            <p>Selección de los mejores libros, sólo para ti.</p>
            
            <NavLink to="/libros-user">

            <button>Ver todos los libros</button>

            </NavLink>
            
          </div>

          <div className="container__home__user-img">
          </div>

        </div>

        <div className="container__home__recommended">


          <h2>Libros de Hoy</h2>

          <div className="container__home__recommended-divs">
            
          {recommendedBooks.map((book, index) => (
              <RecommendedBook
                key={index}
                titulo={book.titulo}
                autor={book.autor}
                numeroCopias={book.numeroCopias}
                portadaURL={book.portadaURL}
                onSolicitarPrestamo={handleSolicitarPrestamo}
              />
            ))}


          </div>




        </div>

           


        <div className="container__home__popular">

          <h2>Los Más Populares</h2>

          <div className="container__home__popular-divs">
            {popularBooks.map((book, index) => (
              <PopularBook key={index} titulo={book.titulo} portadaURL={book.portadaURL} />
            ))}
          </div>



        </div>








      </div>
    </div>
  );
}

export default UserHome;

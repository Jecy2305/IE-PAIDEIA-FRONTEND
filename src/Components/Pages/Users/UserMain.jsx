import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../../AuthContext.jsx"; // Ajusta la ruta según tu estructura
import BookCard from "./BookCard";
import "./UserMain.css";

function UserMain() {
  const [books, setBooks] = useState([]);
  const { user } = useAuth(); // Obtenemos el usuario del contexto

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:44307/api/Libros");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSolicitarPrestamo = async (titulo) => {
    try {
      // Crear el objeto de préstamo con el formato correcto
      const nuevoPrestamo = {
        usuario: user.nombreCompleto, // Asumiendo que nombreUsuario está en el objeto user
        libro: titulo,
        fechaPrestamo: new Date().toISOString(),
        fechaDevolucion: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ).toISOString(), // 3 días desde hoy
        estado: "Pendiente",
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
        alert(
          `Error al solicitar el préstamo: ${
            errorData.message || "Error desconocido"
          }`
        );
      }
    } catch (error) {
      console.log(error);
      alert("Error al procesar la solicitud");
    }
  };

  return (
    <div className="content__modules">
      <header className="content__module-header">
        <h2>Catalago de Libros</h2>
      </header>

      <div className="containerStyle">
        <div className="grouper">
          <ul className="ulGroupStyle" data-aos="fade-left">
            {books.map((book, index) => (
              <BookCard
                key={book.libroId}
                title={book.titulo}
                coverImage={book.portadaURL}
                libroId={book.libroId}
                numeroCopias={book.numeroCopias}
                nombreCategoria={book.categoria.nombreCategoria}
                onSolicitarPrestamo={handleSolicitarPrestamo}
                delay={index * 0.1} // Incrementa el retraso para cada tarjeta
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserMain;

import React from "react";
import { Book, Edit, Plus, Trash2 } from "lucide-react";
import "./DashboardContent.css";
import { useAuth } from "../../AuthContext";

function DashboardContent() {

  const { user } = useAuth();

  return (
    <div className="content__modules">
      <header className="content__module-header">
        <h2>Dashboard</h2>
      </header>

      <div className="container__module">
        <div className="container__module__main">
          <div className="container__module__main-header">
            <header>
              <h2>Bienvenido, {user.nombreCompleto}</h2>
              <p>
                Aquí tienes un resumen de la actividad reciente en la
                biblioteca. ¿En qué te gustaría enfocarte hoy?
              </p>
            </header>
          </div>

          <div className="container__module__rows">
            <div className="container__module__rows-row">
              <p>Total Libros</p>

              <h2>1,234</h2>
            </div>

            <div className="container__module__rows-row">
              <p>Préstamos Activos</p>

              <h2>123</h2>
            </div>

            <div className="container__module__rows-row">
              <p>Nuevos Usuarios</p>

              <h2>12</h2>
            </div>

            <div className="container__module__rows-row">
              <p>Libros Atrasados</p>

              <h2>5</h2>
            </div>
          </div>

          <div className="container__module__two">

            <div className="container__module__two-two">
              <h2>Prestamos Recientes</h2>
            </div>

            <div className="container__module__two-two">
              <h2>Libros Más Populares</h2>

              <div className="container__module__two-two-books">
                <p>
                  <Book></Book>El Principito
                </p>
                <p>
                  <Book></Book>Cien años de soledad
                </p>
                <p>
                  <Book></Book>El señor de los anillos
                </p>
                <p>
                  <Book></Book>Don Quijote
                </p>
                <p>
                  <Book></Book>Harry Potter
                </p>
              </div>
            </div>
          </div>

          <div className="container__module__three">

            <div className="container__module__three-header">

              <h2>Actividad Reciente</h2>

              <div className="container__module__three-main">
              <ul>
                <li>Juan prestó "El principito"</li>
                <li>María devolvió "Cien años de soledad"</li>
                <li>Nuevo libro añadido: "La Metamorfosis""</li>
                <li>Pedro reservó "Harry Potter"</li>
              </ul>
            </div>

            </div>

            


          </div>


        </div>
      </div>
    </div>
  );
}

export default DashboardContent;

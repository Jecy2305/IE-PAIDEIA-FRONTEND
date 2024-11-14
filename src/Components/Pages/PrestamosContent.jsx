import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

function PrestamosContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prestamos, setPrestamos] = useState([]);
  const [activeTab, setActiveTab] = useState("activos");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:44307/api/Prestamos");
        const data = await response.json();
        setPrestamos(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Funciones para manejar las acciones (Aceptar, Rechazar, Devolver)
  const handleAceptar = async (prestamoId) => {
    try {
      const prestamo = prestamos.find(p => p.prestamoId === prestamoId);
  
      if (!prestamo) {
        alert("Préstamo no encontrado");
        return;
      }

      const response = await fetch(`https://localhost:44307/api/Prestamos/${prestamoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prestamoId: prestamo.prestamoId,
          usuario: prestamo.usuario,
          libro: prestamo.libro,
          fechaDevolucion: prestamo.fechaDevolucion,
          estado: "Activo",  // Cambia el estado a "Activo"
        }),
      });

      if (response.ok) {
        alert("Préstamo aceptado");
        setPrestamos((prevPrestamos) =>
          prevPrestamos.map((p) =>
            p.prestamoId === prestamoId ? { ...p, estado: "Activo" } : p
          )
        );
      } else {
        console.log("Error al aceptar el préstamo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRechazar = async (prestamoId) => {
    try {
      const prestamo = prestamos.find(p => p.prestamoId === prestamoId);
  
      if (!prestamo) {
        alert("Préstamo no encontrado");
        return;
      }

      const response = await fetch(`https://localhost:44307/api/Prestamos/${prestamoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        alert("Préstamo rechazado");
        setPrestamos((prevPrestamos) =>
          prevPrestamos.filter((p) => p.prestamoId !== prestamoId)
        );
      } else {
        alert("Error al rechazar el préstamo");
      }
    } catch (error) {
      console.log(error);
      alert("Error al procesar la solicitud");
    }
  };

  const handleDevolver = async (prestamoId) => {
    try {
      const prestamo = prestamos.find(p => p.prestamoId === prestamoId);

      if (!prestamo) {
        alert("Préstamo no encontrado");
        return;
      }

      const response = await fetch(`https://localhost:44307/api/Prestamos/${prestamoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prestamoId: prestamo.prestamoId,
          usuario: prestamo.usuario,
          libro: prestamo.libro,
          fechaDevolucion: prestamo.fechaDevolucion,
          estado: "Devuelto",
        }),
      });

      if (response.ok) {
        alert("Devolucion Correcta");
        setPrestamos((prevPrestamos) =>
          prevPrestamos.map((p) =>
            p.prestamoId === prestamoId ? { ...p, estado: "Devuelto" } : p
          )
        );
      } else {
        console.log("Error al devolver el préstamo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filtrar préstamos dependiendo de la pestaña seleccionada
  const prestamosFiltrados = prestamos.filter((prestamo) => {
    if (activeTab === "activos") {
      return prestamo.estado === "Activo";
    } else if (activeTab === "pendientes") {
      return prestamo.estado === "Pendiente";
    } else if (activeTab === "devolucionesPendientes") {
      return prestamo.estado === "Devolucion Pendiente";
    } else if (activeTab === "historial") {
      return prestamo.estado !== "Activo"; // Todos los préstamos excepto los activos
    }
    return false;
  });

  // Función para formatear la fecha
  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }

  return (
    <div className="content__modules">
      <header className="content__module-header">
        <h2>Prestamos</h2>
      </header>

      <div className="container__module">
        <div className="container__module__main">
          <div className="container__module__main-header">
            <header>
              <h2>Gestión de Préstamos y Reservas</h2>
              <p>Administra los préstamos y reservas de libros.</p>
            </header>
          </div>

          <div className="container__module__main-search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar préstamos..."
            />

            <button onClick={() => setIsModalOpen(true)}>
              <Plus />
              Nuevo Prestamo
            </button>
          </div>

          <div className="tabs">
            <button
              className={activeTab === "activos" ? "active" : ""}
              onClick={() => setActiveTab("activos")}
            >
              Préstamos Activos
            </button>
            <button
              className={activeTab === "pendientes" ? "active" : ""}
              onClick={() => setActiveTab("pendientes")}
            >
              Préstamos Pendientes
            </button>
            <button
              className={activeTab === "devolucionesPendientes" ? "active" : ""}
              onClick={() => setActiveTab("devolucionesPendientes")}
            >
              Devoluciones Pendientes
            </button>
            <button
              className={activeTab === "historial" ? "active" : ""}
              onClick={() => setActiveTab("historial")}
            >
              Historial de Préstamos
            </button>
          </div>

          <div className="container__module__main-table">
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Libro</th>
                  <th>Fecha de Devolución</th>
                  <th>Estado</th>
                  {activeTab !== "historial" && <th>Acciones</th>}
                </tr>
              </thead>

              <tbody>
                {prestamosFiltrados.map((prestamo, index) => (
                  <tr key={index}>
                    <td>{prestamo.usuario}</td>
                    <td>{prestamo.libro}</td>
                    <td>{formatearFecha(prestamo.fechaDevolucion)}</td>
                    <td>{prestamo.estado}</td>
                    {activeTab !== "historial" && (
                      <td className="row-buttons">
                        {activeTab === "pendientes" ? (
                          <>
                            <button
                              className="icon-button"
                              onClick={() => handleAceptar(prestamo.prestamoId)}
                            >
                              Aceptar
                            </button>
                            <button
                              className="icon-button"
                              onClick={() => handleRechazar(prestamo.prestamoId)}
                            >
                              Rechazar
                            </button>
                          </>
                        ) : activeTab === "devolucionesPendientes" ? (
                          <>
                            <button
                              className="icon-button"
                              onClick={() => handleDevolver(prestamo.prestamoId)}
                            >
                              Marcar como devuelto
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="icon-button"
                              onClick={() => handleDevolver(prestamo.prestamoId)}
                            >
                              Devolver
                            </button>
                          </>
                        )}
                      </td>
                    )}
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

export default PrestamosContent;

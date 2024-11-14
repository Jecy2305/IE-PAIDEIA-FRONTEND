import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "../../../AuthContext";

function UserPrestamos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prestamos, setPrestamos] = useState([]);
  const [activeTab, setActiveTab] = useState("activos");
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:44307/api/Usuarios/${user.usuarioId}/Prestamos`);
        const data = await response.json();
        setPrestamos(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
          estado: "Devolucion Pendiente",
        }),
      });

      if (response.ok) {
        alert("Solicitud De Devolucion Correcta");
        setPrestamos((prevPrestamos) =>
          prevPrestamos.map((p) =>
            p.prestamoId === prestamoId ? { ...p, estado: "Devolucion Pendiente" } : p
          )
        );
      } else {
        console.log("Error al devolver el préstamo");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleCancelar = async (prestamoId) => {
    try {
      // Encuentra el préstamo en la lista de préstamos por su ID
      const prestamo = prestamos.find(p => p.prestamoId === prestamoId);
  
      if (!prestamo) {
        alert("Préstamo no encontrado");
        return;
      }
  
      // Realiza la petición PUT para actualizar el estado del préstamo a "Cancelado"
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
          estado: "Cancelado",  // Cambia el estado a "Cancelado"
        }),
      });
  
      if (response.ok) {
        alert("Préstamo Cancelado Correctamente");
        // Opcional: Actualiza el estado local de préstamos
        setPrestamos((prevPrestamos) =>
          prevPrestamos.map((p) =>
            p.prestamoId === prestamoId ? { ...p, estado: "Cancelado" } : p
          )
        );
      } else {
        console.log("Error al aceptar al cancelar el prestamo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const prestamosFiltrados = prestamos.filter((prestamo) => {
    if (activeTab === "activos") {
      return prestamo.estado === "Activo";
    } else if (activeTab === "pendientes") {
      return prestamo.estado === "Pendiente";
    } else if (activeTab === "historial") {
      return true; // Mostrar todos los préstamos
    }
    return false;
  });

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
              <h2>Tu Historial de Préstamos y Reservas</h2>
              <p>Puedes ver tus prestamos activos, pendientes, y el historial completo.</p>
            </header>
          </div>

          <div className="container__module__main-search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar préstamos..."
            />
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
                  {activeTab !== "historial" && <th>Acciones</th>} {/* No mostrar columna de acciones en historial */}
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
                        {prestamo.estado === "Pendiente" ? (
                          <button
                            className="icon-button"
                            onClick={() => handleCancelar(prestamo.prestamoId)}
                          >
                            Cancelar Solicitud
                          </button>
                        ) : prestamo.estado === "Activo" ? (
                          <button
                            className="icon-button"
                            onClick={() => handleDevolver(prestamo.prestamoId)}
                          >
                            Devolver
                          </button>
                        ) : null}
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

export default UserPrestamos;

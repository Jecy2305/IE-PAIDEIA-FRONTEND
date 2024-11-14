import React from "react";
import "./LibrosContent.css";
import { Edit, Plus, Trash2 } from "lucide-react";
import ModalAddRecurso from "./Modals/ModalAddRecurso";
import { useState, useEffect } from "react";
import ModalEditRecurso from "./Modals/ModalEditRecurso";

function RecursosContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://localhost:44307/api/RecursosDigitales"
        );
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalEdit = (recurso) => {
    setSelectedResource(recurso); // Almacenar el recurso seleccionado
    setIsModalEditOpen(true);
  };

  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO); // Convertir la cadena ISO a un objeto Date
    const dia = String(fecha.getDate()).padStart(2, "0"); // Obtener el día con dos dígitos
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Obtener el mes (se le suma 1 porque getMonth() retorna de 0 a 11)
    const anio = fecha.getFullYear(); // Obtener el año

    return `${dia}-${mes}-${anio}`; // Formatear la fecha en día-mes-año
  }

  const filteredResources = resources.filter(resource => 
    resource.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="content__modules">
      <header className="content__module-header">
        <h2>Recursos Digitales</h2>
      </header>

      <div className="container__module">
        <div className="container__module__main">
          <div className="container__module__main-header">
            <header>
              <h2>Recursos Digitales</h2>
              <p>Accede y gestiona los recursos digitales de la biblioteca.</p>
            </header>
          </div>

          <ModalAddRecurso isOpen={isModalOpen} onClose={closeModal} setResources={setResources} resources={resources}></ModalAddRecurso>

          <ModalEditRecurso isOpen={isModalEditOpen} onClose={closeModalEdit} recurso={selectedResource}></ModalEditRecurso>

          <div className="container__module__main-search">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar Recursos..." />

            <button onClick={openModal}>
              <Plus></Plus>
              Añadir Recurso
            </button>
          </div>

          <div className="container__module__main-table">
            <table>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredResources.map((resource, index) => (
                  <tr key={index}>
                    <td>{resource.titulo}</td>
                    <td>{formatearFecha(resource.fechaRegistro)}</td>
                    <td className="row-buttons">

                      <a href={resource.url} target="_blank">
                        <button className="icon-button" id="button-resource" >Ver Online</button>
                      </a>
                      <button
                        className="icon-button"
                        onClick={() => openModalEdit(resource)}
                      >
                        <Edit />
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

export default RecursosContent;

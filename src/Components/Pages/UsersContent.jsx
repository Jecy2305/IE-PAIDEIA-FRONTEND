import React from "react";
import "./LibrosContent.css";
import { Edit, Plus, Trash, Trash2, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import ModalEditUser from "./Modals/ModalEditUser";
import ModalAddUser from "./Modals/ModalAddUser";


function UsersContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  
  const[users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() =>{
    const fetchData = async () =>{
      try {
        const response = await fetch("https://localhost:44307/api/Usuarios")
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
      
  }, [])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalEdit = (user) => {
    setSelectedUser(user); // Almacenar el usuario seleccionado
    setIsModalEditOpen(true);
  };

  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  const filteredUsers = users.filter(user => 
    user.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="content__modules">
      <header className="content__module-header">
        <h2>Usuarios</h2>
      </header>

      <div className="container__module">
        <div className="container__module__main">
          <div className="container__module__main-header">
            <header>
              <h2>Gestion de Usuarios</h2>
              <p>Administra los usuarios del sistema de biblioteca.</p>
            </header>
          </div>


          <ModalAddUser isOpen={isModalOpen} onClose={closeModal}></ModalAddUser>
          <ModalEditUser isOpen={isModalEditOpen} onClose={closeModalEdit} user={selectedUser}></ModalEditUser>


          <div className="container__module__main-search">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar Usuarios..."/>

            <button onClick={openModal}>
              <UserPlus></UserPlus>
              Añadir Usuario
            </button>
          </div>


          <div className="container__module__main-table">
            <table>
              <thead>
                <tr>
                  <th>Nombres</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.nombreCompleto}</td>
                    <td>{user.email}</td>
                    <td>{user.rol.nombreRol}</td>
                    <td>
                      <button className="icon-button" onClick={() => openModalEdit(user)}>
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

export default UsersContent;

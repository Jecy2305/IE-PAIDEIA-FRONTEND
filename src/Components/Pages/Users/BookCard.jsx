import React from "react";
import { motion } from "framer-motion";
import "./BookCard.css";

const BookCard = ({ title, coverImage, numeroCopias, nombreCategoria, onSolicitarPrestamo, delay }) => {
  return (
    <motion.li
      className="cardStyle"
      initial={{ opacity: 0, x: 30, scale: 0.95 }}  // Desplazamiento menor y escala para suavizar
      animate={{ opacity: 1, x: 0, scale: 1 }}      // Sin rebote visible
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: delay
      }}
      style={{ transformOrigin: "right center" }}  // Para entrada más suave
    >
      <img src={coverImage} alt={title} className="imageStyle" />
      <h3 className="bookTitle">{title}</h3>
      <p>Copias Disponibles: {numeroCopias}</p>
      <p>Género: {nombreCategoria}</p>
      <button 
        className="solicitarButton"
        onClick={() => onSolicitarPrestamo(title)}
      >
        Solicitar Préstamo
      </button>
    </motion.li>
  );
};

export default BookCard;

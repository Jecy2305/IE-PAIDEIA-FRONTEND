const RecommendedBook = ({ titulo, autor, numeroCopias, portadaURL, nombreCategoria, onSolicitarPrestamo }) => {
  
    return (
      <div className="recommended-div-rr">
        <div className="recommended-div-img">
          {portadaURL && <img src={portadaURL} alt="portada" />}
        </div>
        <div className="recommended-div-text">
          <h2>{titulo}</h2>
          <p>{autor}</p>
          <p>Género: {nombreCategoria}</p>
          <p>Copias disponibles: {numeroCopias}</p>
          <button onClick={() => onSolicitarPrestamo(titulo)}>Solicitar Prestamo</button>
        </div>
      </div>
    );
  };

export default RecommendedBook;
  
const PopularBook = ({ titulo, portadaURL }) => {
    return (
      <div className="popular-div">
        <div className="popular-div-img">
          {portadaURL && <img src={portadaURL} alt="portada popular" />}
        </div>
        <div className="popular-div-text">
          <h3>{titulo}</h3>
        </div>
      </div>
    );
  };

export default PopularBook;
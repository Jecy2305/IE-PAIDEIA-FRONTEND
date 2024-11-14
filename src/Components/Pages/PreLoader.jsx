import React, { useEffect } from "react";
import "./PreLoader.css";
import { preLoaderAnim } from "../animations";

const PreLoader = ( {name} ) => {
    useEffect(() => {
      preLoaderAnim();
    }, []);
    return (
      <div className="preloader">
        <div className="texts-container">
          <span>Bienvenido, </span>
          <span>{name}, </span>
          <span>📚</span>
        </div>
      </div>
    );
  };
  
  export default PreLoader;

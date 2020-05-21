import React from "react";
import estilos from "./Backdrop.module.css";

const Backdrop = (props) => {
    let contenido;
    props.mostrar ? contenido = (<div className={estilos.Backdrop} onClick={props.clicked}></div>) : contenido = null;
    return contenido;
}

export default Backdrop;
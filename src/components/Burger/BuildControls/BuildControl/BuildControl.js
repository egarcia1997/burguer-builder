import React from "react";
import estilos from "./BuildControl.module.css";

const BuildControl = (props) => {
    return (
        <div className={estilos.BuildControl}>
            <div className={estilos.Label}>{props.label}</div>
            <button className={estilos.Less}>Quitar</button>
            <button className={estilos.More}>Agregar</button>
        </div>
    );
}

export default BuildControl;
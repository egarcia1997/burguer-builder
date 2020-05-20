import React from "react";
import estilos from "./BuildControl.module.css";

const BuildControl = (props) => {
    return (
        <div className={estilos.BuildControl}>
            <div className={estilos.Label}>{props.label}</div>
            <button className={estilos.Less} onClick={props.remove} disabled={props.disabled}>Quitar</button>
            <button className={estilos.More} onClick={props.add}>Agregar</button>
        </div>
    );
}

export default BuildControl;
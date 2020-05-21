import React from "react";
import estilos from "./Modal.module.css";

const Modal = (props) => {
    return (
        <div className={estilos.Modal} style={{
            transform: props.mostrar ? "translateY(0)" : "translateY(-100vh)",
            opacity: props.mostrar ? "1" : "0"
        }}>
            {props.children}
        </div>
    );
}

export default Modal;
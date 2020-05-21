import React, { Fragment } from "react";
import estilos from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
    return (
        <Fragment>
            <Backdrop mostrar={props.mostrar} clicked={props.modalClosed} />
            <div className={estilos.Modal} style={{
                transform: props.mostrar ? "translateY(0)" : "translateY(-100vh)",
                opacity: props.mostrar ? "1" : "0"
            }}>
                {props.children}
            </div>
        </Fragment>
    );
}

export default Modal;
import React, { Fragment } from "react";
import estilos from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
    // esto esta para evitar que se vuelva a renderizar el componente OrderSummary
    // cada vez que agrego ingredientes a la hamburguesa
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.mostrar !== this.props.mostrar || nextProps.children !== this.props.children;
    // }

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

export default React.memo(Modal, (prevProps, nextProps) =>
    nextProps.mostrar === prevProps.mostrar && nextProps.children === prevProps.children
);
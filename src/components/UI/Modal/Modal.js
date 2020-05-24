import React, { Fragment, Component } from "react";
import estilos from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    // esto esta para evitar que se vuelva a renderizar el componente OrderSummary
    // cada vez que agrego ingredientes a la hamburguesa
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.mostrar !== this.props.mostrar;
    }

    componentDidUpdate() {
        console.log("[Modal] DidUpdate");
    }

    render() {
        return (
            <Fragment>
                <Backdrop mostrar={this.props.mostrar} clicked={this.props.modalClosed} />
                <div className={estilos.Modal} style={{
                    transform: this.props.mostrar ? "translateY(0)" : "translateY(-100vh)",
                    opacity: this.props.mostrar ? "1" : "0"
                }}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default Modal;
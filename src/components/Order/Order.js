import React from "react";
import estilos from "./Order.module.css";

const Order = (props) => {
    return (
        <div className={estilos.Order}>
            <p>Ingredientes</p>
            <p>Precio:</p>
        </div>
    );
}

export default Order;
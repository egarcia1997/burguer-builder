import React from "react";
import estilos from "./Order.module.css";

const Order = (props) => {
    const ingredientes = [];
    for (let ingrediente in props.ingredientes) {
        ingredientes.push({nombre: ingrediente, cantidad: props.ingredientes[ingrediente]});
    }
    const salida = ingredientes.map(ingrediente => {
        return (
            <span key={ingrediente.nombre} className={estilos.Ingrediente}>
                {ingrediente.nombre} ({ingrediente.cantidad})
            </span>);
    })
    return (
        <div className={estilos.Order}>
            <p>Ingredientes: {salida}</p>
            <p>Precio: <b>USD {Number.parseFloat(props.precio).toFixed(2)}</b></p>
        </div>
    );
}

export default Order;
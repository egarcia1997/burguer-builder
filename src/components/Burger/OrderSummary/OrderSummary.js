import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
    const resumenDeIngredientes = Object.keys(props.ingredientes).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: "capitalize"}}>{igKey}:</span> {props.ingredientes[igKey]}
            </li>
        );
    });
    return(
        <Fragment>
            <h3>Tu pedido:</h3>
            <p>Una hamburguesa con mucho colesterol y estos ingredientes:</p>
            <ul>{resumenDeIngredientes}</ul>
            <p><b>Precio total: ${props.precio.toFixed(2)}</b></p>
            <p>¿Seguir a la confirmación de la compra?</p>
            <Button tipo="Danger" clicked={props.compraCancelada}>CANCELAR</Button>
            <Button tipo="Success" clicked={props.continuarCompra}>CONTINUAR</Button>
        </Fragment>
    );
}

export default OrderSummary;
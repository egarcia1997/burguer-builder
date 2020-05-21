import React, {Fragment} from "react";

const OrderSummary = (props) => {
    const resumenDeIngredientes = Object.keys(props.ingredientes).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: "capitalize"}}>{igKey}:</span> {props.ingredientes[igKey]}
            </li>
        );
    });
    return(
        <Fragment>
            <h3>Tu orden:</h3>
            <p>Una haburguesa con mucho colesterol y estos ingredientes:</p>
            <ul>{resumenDeIngredientes}</ul>
            <p>¿Seguir a la confirmación de la compra?</p>
        </Fragment>
    );
}

export default OrderSummary;
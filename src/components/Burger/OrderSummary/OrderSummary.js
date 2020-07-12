import React, {Fragment, Component} from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    render() {
        const resumenDeIngredientes = Object.keys(this.props.ingredientes).map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}:</span> {this.props.ingredientes[igKey]}
                </li>
            );
        });
        return(
            <Fragment>
                <h3>Tu orden:</h3>
                <p>Una haburguesa con mucho colesterol y estos ingredientes:</p>
                <ul>{resumenDeIngredientes}</ul>
                <p><b>Precio total: ${this.props.precio.toFixed(2)}</b></p>
                <p>¿Seguir a la confirmación de la compra?</p>
                <Button tipo="Danger" clicked={this.props.compraCancelada}>CANCELAR</Button>
                <Button tipo="Success" clicked={this.props.continuarCompra}>CONTINUAR</Button>
            </Fragment>
        );
    }
}

export default OrderSummary;
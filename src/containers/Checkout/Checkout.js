import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
        ingredientes: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        }
    }

    cancelarCompraHandler = () => {
        // este metodo es lo mismo que hacer clic en el boton atras del navegador
        this.props.history.goBack();
    }

    continuarCompraHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredientes={this.state.ingredientes}
                    cancelarCompra={this.cancelarCompraHandler}
                    continuarCompra={this.continuarCompraHandler}
                />
            </div>
        );
    }
}

export default Checkout;
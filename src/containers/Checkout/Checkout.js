import React, {Component} from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredientes: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        },
        precioTotal: 6.9,
    }

    componentDidMount() {
        // this.props.location.search incluye desde el ? en la url
        // con URLSearchParams se lo elimina al ?
        console.log(this.props.location.search.replace(/%3D/g, "="));
        const query = new URLSearchParams(this.props.location.search.replace(/%3D/g, "="));
        let precio = 0;
        console.log("query", query);
        const ingredientes = {};
        for (let param in query.entries()) {
            // query.entries() devuelve un array cuyos elementos son arrays
            // tipo clave/valor (algo asi ["salad", "1"])
            if (param[0] === "precio") {
                precio = param[1];
            } else {
                ingredientes[param[0]] = +param[1];
            }
            console.log("param", param);
        }
        //this.setState({ingredientes: ingredientes, precioTotal: precio});
    }

    cancelarCompraHandler = () => {
        // este metodo es lo mismo que hacer clic en el boton atras del navegador
        this.props.history.goBack();
    }

    continuarCompraHandler = () => {
        this.props.history.push("/checkout/contact-data");
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredientes={this.state.ingredientes}
                    cancelarCompra={this.cancelarCompraHandler}
                    continuarCompra={this.continuarCompraHandler}
                />
                <Route
                    path={this.props.match.path + "/contact-data"}
                    render={() => <ContactData ingredientes={this.state.ingredientes} precio={this.state.precioTotal.toFixed(2)} />}
                />
            </div>
        );
    }
}

export default Checkout;
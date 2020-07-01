import React, {Component} from "react";
import { Route, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    cancelarCompraHandler = () => {
        // este metodo es lo mismo que hacer clic en el boton atras del navegador
        this.props.history.goBack();
    }

    continuarCompraHandler = () => {
        this.props.history.push("/checkout/contact-data");
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredientes={this.props.ingredients}
                        cancelarCompra={this.cancelarCompraHandler}
                        continuarCompra={this.continuarCompraHandler}
                    />
                    <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
                </div>
                
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);
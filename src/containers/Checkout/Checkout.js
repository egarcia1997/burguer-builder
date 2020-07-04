import React, {Component} from "react";
import { Route, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import * as actions from "../../store/actions/index";

class Checkout extends Component {
    componentDidMount = () => {
        this.props.onInitPurchase();
    }

    cancelarCompraHandler = () => {
        // este metodo es lo mismo que hacer clic en el boton atras del navegador
        this.props.history.goBack();
    }

    continuarCompraHandler = () => {
        this.props.history.push("/checkout/contact-data");
    }

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            const purchasedReditect = this.props.comprado ? <Redirect to="/" /> :  null;
            summary = (
                <div>
                    {purchasedReditect}
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
        ingredients: state.burgerBuilder.ingredients,
        comprado: state.order.comprado,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
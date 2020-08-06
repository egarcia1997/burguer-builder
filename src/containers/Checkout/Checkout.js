import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import * as actions from "../../store/actions/index";

const Checkout = props => {
    const {onInitPurchase} = props;
    useEffect(() => {
        onInitPurchase();
    }, [onInitPurchase]);

    const cancelarCompraHandler = () => {
        // este metodo es lo mismo que hacer clic en el boton atras del navegador
        props.history.goBack();
    }

    const continuarCompraHandler = () => {
        props.history.push("/checkout/contact-data");
    }

    let summary = <Redirect to="/" />;
    if (props.ingredients) {
        const purchasedReditect = props.comprado ? <Redirect to="/" /> :  null;
        summary = (
            <div>
                {purchasedReditect}
                <CheckoutSummary
                    ingredientes={props.ingredients}
                    cancelarCompra={cancelarCompraHandler}
                    continuarCompra={continuarCompraHandler}
                />
                <Route path={props.match.path + "/contact-data"} component={ContactData} />
            </div>
            
        );
    }
    return summary;
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
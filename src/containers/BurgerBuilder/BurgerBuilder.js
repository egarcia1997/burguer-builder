import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import { addIngredient, removeIngredient, initIngredients, setAuthRedirectPath } from "../../store/actions/index";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const BurguerBuilder = props => {
    const [comprando, setComprando] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const actualizarEstadoComprable = ingredientes => {
        const sum = Object.keys(ingredientes).map(igKey => {
            return ingredientes[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    const compraHandler = () => {
        if (props.isAuthenticated) {
            setComprando(true);
        }
        else {
            props.onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    }

    const compraCanceladaHandler = () => {
        setComprando(false);
    }

    const continuarCompraHandler = () => {
        props.history.push("/checkout");
    }

    const disabledInfo = {...props.ingredients};
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    if (props.ingredients) {
        orderSummary = (
            <OrderSummary
                ingredientes={props.ingredients}
                precio={props.totalPrice}
                compraCancelada={compraCanceladaHandler}
                continuarCompra={continuarCompraHandler}
            />
        );
    }

    let burger = props.error ? <p>No se pueden cargar los ingredientes</p> : <Spinner />
    if (props.ingredients) {
        burger = (
            <Fragment>
                <Burger ingredientes={props.ingredients} />
                <BuildControls
                    agregar={props.onIngredientAdded}
                    quitar={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    precio={props.totalPrice}
                    comprable={actualizarEstadoComprable(props.ingredients)}
                    comprar={compraHandler}
                    isAuth={props.isAuthenticated}
                />
            </Fragment>
        );    
    }

    return (
        <div>
            <Modal mostrar={comprando} modalClosed={compraCanceladaHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredient) => dispatch(addIngredient(ingredient)),
        onIngredientRemoved: (ingredient) => dispatch(removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(initIngredients()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));
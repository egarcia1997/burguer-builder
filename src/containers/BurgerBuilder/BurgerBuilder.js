import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();

    const onIngredientAdded = ingredient => dispatch(addIngredient(ingredient));
    const onIngredientRemoved = ingredient => dispatch(removeIngredient(ingredient));
    const onInitIngredients = useCallback(() => dispatch(initIngredients()), []);
    const onSetAuthRedirectPath = path => dispatch(setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const actualizarEstadoComprable = ingredientes => {
        const sum = Object.keys(ingredientes).map(igKey => {
            return ingredientes[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    const compraHandler = () => {
        if (isAuthenticated) {
            setComprando(true);
        }
        else {
            onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    }

    const compraCanceladaHandler = () => {
        setComprando(false);
    }

    const continuarCompraHandler = () => {
        props.history.push("/checkout");
    }

    const disabledInfo = {...ingredients};
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    if (ingredients) {
        orderSummary = (
            <OrderSummary
                ingredientes={ingredients}
                precio={totalPrice}
                compraCancelada={compraCanceladaHandler}
                continuarCompra={continuarCompraHandler}
            />
        );
    }

    let burger = error ? <p>No se pueden cargar los ingredientes</p> : <Spinner />
    if (ingredients) {
        burger = (
            <Fragment>
                <Burger ingredientes={ingredients} />
                <BuildControls
                    agregar={onIngredientAdded}
                    quitar={onIngredientRemoved}
                    disabled={disabledInfo}
                    precio={totalPrice}
                    comprable={actualizarEstadoComprable(ingredients)}
                    comprar={compraHandler}
                    isAuth={isAuthenticated}
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

export default withErrorHandler(BurguerBuilder, axios);
import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import axios from "../../axios-orders";
import {addIngredient, removeIngredient, initIngredients} from "../../store/actions/index";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurguerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }

    state = {
        comprando: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    actualizarEstadoComprable = (ingredientes) => {
        const sum = Object.keys(ingredientes).map(igKey => {
            return ingredientes[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    compraHandler = () => {
        this.setState({comprando: true});
    }

    compraCanceladaHandler = () => {
        this.setState({comprando: false});
    }

    continuarCompraHandler = () => {
        this.props.history.push("/checkout");
    }

    render() {
        const disabledInfo = {...this.props.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        if (this.props.ingredients) {
            orderSummary = (
                <OrderSummary
                    ingredientes={this.props.ingredients}
                    precio={this.props.totalPrice}
                    compraCancelada={this.compraCanceladaHandler}
                    continuarCompra={this.continuarCompraHandler}
                />
            );
        }

        let burger = this.props.error ? <p>No se pueden cargar los ingredientes</p> : <Spinner />
        if (this.props.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredientes={this.props.ingredients} />
                    <BuildControls
                        agregar={this.props.onIngredientAdded}
                        quitar={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        precio={this.props.totalPrice}
                        comprable={this.actualizarEstadoComprable(this.props.ingredients)}
                        comprar={this.compraHandler}
                    />
                </Fragment>
            );    
        }

        return (
            <div>
                <Modal mostrar={this.state.comprando} modalClosed={this.compraCanceladaHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredient) => dispatch(addIngredient(ingredient)),
        onIngredientRemoved: (ingredient) => dispatch(removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(initIngredients()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));
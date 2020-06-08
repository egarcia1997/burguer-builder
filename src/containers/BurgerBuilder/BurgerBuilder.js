import React, {Component, Fragment} from "react";
import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const PRECIOS_INGREDIENTES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7,
}

class BurguerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }

    state = {
        ingredientes: null,
        precioTotal: 4,
        comprable: false,
        comprando: false,
        cargando: false,
        error: null,
    }

    componentDidMount() {
        console.log("BurgerBuilder props", this.props);
        axios.get("https://practica-burger-builder.firebaseio.com/ingredientes.json")
            .then(response => {
                this.setState({ingredientes: response.data});
            }).catch(error => {
                this.setState({error: true});
            });
    }

    addIngredienteHandler = (tipo) => {
        const nuevaCantidad = this.state.ingredientes[tipo] + 1;
        const ingredientesActualizados = {...this.state.ingredientes};
        ingredientesActualizados[tipo] = nuevaCantidad;
        const precioAumentado = PRECIOS_INGREDIENTES[tipo] + this.state.precioTotal;
        this.setState({
            ingredientes: ingredientesActualizados,
            precioTotal: precioAumentado,
        });
        this.actualizarEstadoComprable(ingredientesActualizados);
    }

    removeIngredienteHandler = (tipo) => {
        const nuevaCantidad = this.state.ingredientes[tipo] - 1;
        if (nuevaCantidad < 0) { // este if es porque si hay 0 ingredientes al eliminar queda negativo
            return; // y tira error en Burger
        }
        const ingredientesActualizados = {...this.state.ingredientes};
        ingredientesActualizados[tipo] = nuevaCantidad;
        const precioAumentado = this.state.precioTotal - PRECIOS_INGREDIENTES[tipo];
        this.setState({
            ingredientes: ingredientesActualizados,
            precioTotal: precioAumentado,
        });
        this.actualizarEstadoComprable(ingredientesActualizados);
    }

    actualizarEstadoComprable = (ingredientes) => {
        const sum = Object.keys(ingredientes).map(igKey => {
            return ingredientes[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({comprable: sum > 0});
    }

    compraHandler = () => {
        this.setState({comprando: true});
    }

    compraCanceladaHandler = () => {
        this.setState({comprando: false});
    }

    continuarCompraHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredientes) {
            // encodeURIComponent codifica algo para que pueda ser usado en una url
            // esto sirve por ejemplo para tratar los espacios
            queryParams.push(encodeURIComponent(i + '=' + encodeURIComponent(this.state.ingredientes[i])));
        }
        queryParams.push("precio=" + this.state.precioTotal);
        const queryString = queryParams.join("&"); // una los queryParams con un & entre cada elemento
        // esto es para que quede como una query en una url
        // quedaria algo como salad=1&cheese=1&meat=1&bacon=1
        this.props.history.push({
            pathname: "/checkout", // la url a la que quiero ir
            search: "?" + queryString,
        });
    }

    render() {
        const disabledInfo = {...this.state.ingredientes};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        if (this.state.ingredientes) {
            orderSummary = (
                <OrderSummary
                ingredientes={this.state.ingredientes}
                precio={this.state.precioTotal}
                compraCancelada={this.compraCanceladaHandler}
                continuarCompra={this.continuarCompraHandler}
                />
            );
        }
        if (this.state.cargando) {
            orderSummary = <Spinner />;
        }

        let burger = this.state.error ? <p>No se pueden cargar los ingredientes</p> : <Spinner />
        if (this.state.ingredientes) {
            burger = (
                <Fragment>
                    <Burger ingredientes={this.state.ingredientes} />
                    <BuildControls
                    agregar={this.addIngredienteHandler}
                    quitar={this.removeIngredienteHandler}
                    disabled={disabledInfo}
                    precio={this.state.precioTotal}
                    comprable={this.state.comprable}
                    comprar={this.compraHandler} />
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

export default withErrorHandler(BurguerBuilder, axios);
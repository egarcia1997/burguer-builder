import React, {Component, Fragment} from "react";
import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
        ingredientes: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        precioTotal: 4,
        comprable: false,
        comprando: false,
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
        const compra = {
            ingredientes: this.state.ingredientes,
            precio: this.state.precioTotal, // en una app real, el precio se calcula en el servidor, no aca
            cliente: {
                nombre: "E. García",
                direccion: {
                    calle: "Calle Falsa 123",
                    codigoPostal: "1234",
                    pais: "Peronia",
                },
                email: "alguien@dominio.com",
            },
            envio: "Venezolano de PedidosYa",
        }
        axios.post("/compras.json", compra)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        const disabledInfo = {...this.state.ingredientes};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Fragment>
                <Modal mostrar={this.state.comprando} modalClosed={this.compraCanceladaHandler}>
                    <OrderSummary
                    ingredientes={this.state.ingredientes}
                    precio={this.state.precioTotal}
                    compraCancelada={this.compraCanceladaHandler}
                    continuarCompra={this.continuarCompraHandler}
                    />
                </Modal>
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
}

export default BurguerBuilder;
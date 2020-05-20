import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
    }

    removeIngredienteHandler = (tipo) => {

    }

    render() {
        return (
            <Fragment>
                <Burger ingredientes={this.state.ingredientes} />
                <BuildControls agregar={this.addIngredienteHandler} quitar={this.removeIngredienteHandler} />
            </Fragment>
        );
    }
}

export default BurguerBuilder;
import React from "react";
import { withRouter } from "react-router-dom";
import estilos from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
    let ingredientesTransformados = Object.keys(props.ingredientes).map(igKey => {
        return [...Array(props.ingredientes[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} tipo={igKey} />;
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    if (ingredientesTransformados.length === 0) {
        ingredientesTransformados = <p>Empezá a agregar los ingredientes</p>
    }

    return(
        <div className={estilos.Burger}>
            <BurgerIngredient tipo="bread-top" />
            {ingredientesTransformados}
            <BurgerIngredient tipo="bread-bottom" />
        </div>
    );
}

// esto hoc se usa para que este componente tenga props.history
// normalmente ese prop solo esta disponible en los componentes a los que se accede desde un Route
// props.history.match va a hacer referencia a la ruta mas reciente
export default withRouter(Burger);
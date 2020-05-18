import React from "react";
import estilos from "./BurgerIngredient.css";

const BurgerIngredient = (props) => {
    let ingrediente = null;
    switch (props.tipo) {
        case ("bread-bottom"):
            ingrediente = <div className={estilos.BreadBottom}></div>;
            break;
        case ("bread-top"):
            ingrediente = (
                <div className={estilos.BreadTop}>
                    <div className={estilos.Seeds1}></div>
                    <div className={estilos.Seeds2}></div>
                </div>
            );
            break;
        case ("meat"):
            ingrediente = <div className={estilos.Meat}></div>;
            break;
        case ("cheese"):
            ingrediente = <div className={estilos.Cheese}></div>;
            break;
        case ("salad"):
            ingrediente = <div className={estilos.Salad}></div>;
            break;
        case ("bacon"):
            ingrediente = <div className={estilos.Bacon}></div>;
            break;
        default:
            ingrediente = null;
    }
    return ingrediente;
}

export default BurgerIngredient
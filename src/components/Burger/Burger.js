import React from "react";
import estilos from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
    return(
        <div className={estilos.Burger}>
            <BurgerIngredient tipo="bread-top" />
            <BurgerIngredient tipo="cheese" />
            <BurgerIngredient tipo="meat" />
            <BurgerIngredient tipo="bread-bottom" />
        </div>
    );
}

export default Burger;
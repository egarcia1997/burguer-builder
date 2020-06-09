import React from "react";
import estilos from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
    return (
        <ul className={estilos.NavigationItems}>
            <NavigationItem link="/">Constructor de Hamburguesas</NavigationItem>
            <NavigationItem link="/orders">Compras</NavigationItem>
        </ul>
    );
}

export default NavigationItems;
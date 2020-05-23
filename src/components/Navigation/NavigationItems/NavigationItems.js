import React from "react";
import estilos from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
    return (
        <ul className={estilos.NavigationItems}>
            <NavigationItem link="/" active={true}>Constructor de Hamburguesas</NavigationItem>
            <NavigationItem link="/" active={false}>Checkout</NavigationItem>
        </ul>
    );
}

export default NavigationItems;
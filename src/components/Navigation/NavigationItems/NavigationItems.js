import React from "react";
import estilos from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
    return (
        <ul className={estilos.NavigationItems}>
            <NavigationItem link="/">Constructor de Hamburguesas</NavigationItem>
            <NavigationItem link="/orders">Compras</NavigationItem>
            {props.isAuthenticated ?
                <NavigationItem link="/logout">Cerrar sesión</NavigationItem>
            :
                <NavigationItem link="/auth">Iniciar sesión</NavigationItem>
            }
        </ul>
    );
}

export default NavigationItems;
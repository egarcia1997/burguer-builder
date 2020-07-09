import React, { Fragment } from "react";
import estilos from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
    return (
        <ul className={estilos.NavigationItems}>
            <NavigationItem link="/">Constructor de Hamburguesas</NavigationItem>
            {props.isAuthenticated ?
                <Fragment>
                    <NavigationItem link="/orders">Compras</NavigationItem>
                    <NavigationItem link="/logout">Cerrar sesión</NavigationItem>
                </Fragment>
            :
                <NavigationItem link="/auth">Iniciar sesión</NavigationItem>
            }
        </ul>
    );
}

export default NavigationItems;
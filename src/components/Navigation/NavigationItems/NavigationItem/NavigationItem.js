import React from "react";
import { NavLink } from "react-router-dom";
import estilos from "./NavigationItem.module.css";

const NavigationItem = (props) => {
    return (
        <li className={estilos.NavigationItem}>
            <NavLink to={props.link} exact={true} activeClassName={estilos.active}>{props.children}</NavLink>
        </li>
    );
}

export default NavigationItem;
import React from "react";
import estilos from "./NavigationItem.module.css";

const NavigationItem = (props) => {
    return (
        <li className={estilos.NavigationItem}>
            <a href={props.link} className={props.active ? estilos.active : null}>
                {props.children}
            </a>
        </li>
    );
}

export default NavigationItem;
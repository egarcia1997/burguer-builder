import React from "react";
import estilos from "./DrawerToggle.module.css";

const DrawerToggle = (props) => {
    return (
        <div className={estilos.DrawerToggle} onClick={props.click}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default DrawerToggle;
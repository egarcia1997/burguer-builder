import React from "react";
import estilos from "./Button.module.css";

const Button = (props) => {
    return (
        <button className={[estilos.Button, estilos[props.tipo]].join(" ")} onClick={props.clicked}>{props.children}</button>
    );
}

export default Button;
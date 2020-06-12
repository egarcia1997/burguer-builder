import React from "react";
import estilos from "./Input.module.css";

const Input = (props) => {
    let inputElement = null;
    switch (props.type) {
        case "text":
            inputElement = <input className={estilos.InputElement} {...props.elementConfig} value={props.value} />;
            break;
        case "textarea":
            inputElement = <textarea className={estilos.InputElement} {...props.elementConfig} value={props.value} />;
            break;
        default:
            inputElement = <input className={estilos.InputElement} {...props.elementConfig} value={props.value} />;
            break;
    }
    return (
        <div className={estilos.Input}>
            <label className={estilos.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;
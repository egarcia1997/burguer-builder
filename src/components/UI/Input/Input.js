import React from "react";
import estilos from "./Input.module.css";

const Input = (props) => {
    let inputElement = null;
    switch (props.type) {
        case "text":
            inputElement = <input type="text" className={estilos.InputElement} {...props} />;
            break;
        case "textarea":
            inputElement = <textarea className={estilos.InputElement} {...props} />;
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
import React from "react";
import estilos from "./Input.module.css";

const Input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case "text":
            inputElement =
                <input
                    className={estilos.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />;
            break;
        case "textarea":
            inputElement =
                <textarea
                    className={estilos.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />;
            break;
        case "select":
            inputElement = (
                <select className={estilos.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select> 
            );
            break;
        default:
            inputElement =
                <input
                    className={estilos.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />;
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
import React from "react";
import estilos from "./Input.module.css";

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [estilos.InputElement];
    if (props.invalid && props.touched) {
        inputClasses.push(estilos.Invalid);
    }
    switch (props.elementType) {
        case "text":
            inputElement =
                <input
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />;
            break;
        case "textarea":
            inputElement =
                <textarea
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />;
            break;
        case "select":
            inputElement = (
                <select className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select> 
            );
            break;
        default:
            inputElement =
                <input
                    className={inputClasses.join(" ")}
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
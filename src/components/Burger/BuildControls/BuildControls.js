import React from "react";
import estilos from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controles = [
    {label: "Salad", tipo: "salad"},
    {label: "Bacon", tipo: "bacon"},
    {label: "Cheese", tipo: "cheese"},
    {label: "Meat", tipo: "meat"},
];

const BuildControls = (props) => {
    return (
        <div className={estilos.BuildControls}>
            {controles.map(ctrl => {
                return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                add={() => props.agregar(ctrl.tipo)}
                remove={() => props.quitar(ctrl.tipo)}
                disabled={props.disabled[ctrl.tipo]} />;
            })}
        </div>
    );
}

export default BuildControls;
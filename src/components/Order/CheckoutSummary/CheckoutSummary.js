import React from "react";
import estilos from "./CheckoutSummary.module.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckoutSummary = (props) => {
    return (
        <div className={estilos.CheckoutSummary}>
            <h1>Espero que te guste</h1>
            <div style={{width: "100%", margin: "auto"}}>
                <Burger ingredientes={props.ingredientes} />
            </div>
            <Button tipo="Danger">CANCELAR</Button>
            <Button tipo="Success">CONTINUAR</Button>
        </div>
    );
}

export default CheckoutSummary;
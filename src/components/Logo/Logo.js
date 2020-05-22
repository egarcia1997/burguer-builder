import React from "react";
import estilos from "./Logo.module.css";
import burgerLogo from "../../assets/images/burger-logo.png";

const Logo = (props) => {
    return (
        <div className={estilos.Logo}>
            <img src={burgerLogo} alt="Logo del Constructor de Hamburguesas" />
        </div>
    );
}

export default Logo;
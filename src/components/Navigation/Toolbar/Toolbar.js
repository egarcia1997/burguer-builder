import React from "react";
import estilos from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";

const Toolbar = (props) => {
    return (
        <header className={estilos.Toolbar}>
            <div>MENU</div>
            <Logo />
            <nav></nav>
        </header>
    );
}

export default Toolbar;
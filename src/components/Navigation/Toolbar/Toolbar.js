import React from "react";
import estilos from "./Toolbar.module.css";

const Toolbar = (props) => {
    return (
        <header className={estilos.Toolbar}>
            <div>MENU</div>
            <div>LOGO</div>
            <nav></nav>
        </header>
    );
}

export default Toolbar;
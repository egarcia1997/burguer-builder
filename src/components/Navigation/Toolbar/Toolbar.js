import React from "react";
import estilos from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = (props) => {
    return (
        <header className={estilos.Toolbar}>
            <div>MENU</div>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default Toolbar;
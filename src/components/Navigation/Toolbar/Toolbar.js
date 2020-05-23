import React from "react";
import estilos from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = (props) => {
    return (
        <header className={estilos.Toolbar}>
            <div>MENU</div>
            <div className={estilos.Logo}>
                <Logo />
            </div>
            <nav className={estilos.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default Toolbar;
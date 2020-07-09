import React from "react";
import estilos from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => {
    return (
        <header className={estilos.Toolbar}>
            <DrawerToggle click={props.drawerToggleClicked} />
            <div className={estilos.Logo}>
                <Logo />
            </div>
            <nav className={estilos.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
    );
}

export default Toolbar;
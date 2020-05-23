import React, {Fragment} from "react";
import estilos from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
    return (
        <Fragment>
            <Toolbar />
            <SideDrawer />
            <main className={estilos.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

export default Layout;
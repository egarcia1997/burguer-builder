import React, {Fragment} from "react";
import estilos from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = (props) => {
    return (
        <Fragment>
            <Toolbar />
            <main className={estilos.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

export default Layout;
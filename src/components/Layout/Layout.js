import React, {Fragment} from "react";
import estilos from "./Layout.module.css";

const Layout = (props) => {
    return (
        <Fragment>
            <div>Toolbar, Sidedrawer, Backdrop</div>
            <main className={estilos.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

export default Layout;
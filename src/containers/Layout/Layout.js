import React, {Fragment, useState} from "react";
import { connect } from "react-redux";
import estilos from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
    const [mostrarSideDrawer, setMostrarSideDrawer] = useState(false);

    const sideDrawerCerradoHandler = () => {
        setMostrarSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setMostrarSideDrawer(!mostrarSideDrawer);
    }

    return (
        <Fragment>
            <Toolbar
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={props.isAuthenticated}
            />
            <SideDrawer
                mostrar={mostrarSideDrawer}
                cerrado={sideDrawerCerradoHandler}
                isAuth={props.isAuthenticated}
            />
            <main className={estilos.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);
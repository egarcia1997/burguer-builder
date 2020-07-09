import React, { Fragment } from "react";
import estilos from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
    let clasesAgregadas = [estilos.SideDrawer, estilos.Close];
    if (props.mostrar) {
        clasesAgregadas[1] = estilos.Open;
    }
    return (
        <Fragment>
            <Backdrop mostrar={props.mostrar} clicked={props.cerrado} />
            <div className={clasesAgregadas.join(" ")}>
                <div className={estilos.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Fragment>
    );
}

export default SideDrawer;
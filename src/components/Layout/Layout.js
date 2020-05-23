import React, {Fragment, Component} from "react";
import estilos from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        mostrarSideDrawer: true,
    }

    sideDrawerCerradoHandler = () => {
        this.setState({mostrarSideDrawer: false});
    }

    render() {
        return (
            <Fragment>
                <Toolbar />
                <SideDrawer mostrar={this.state.mostrarSideDrawer} cerrado={this.sideDrawerCerradoHandler} />
                <main className={estilos.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;
import React, {Fragment, Component} from "react";
import estilos from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        mostrarSideDrawer: false,
    }

    sideDrawerCerradoHandler = () => {
        this.setState({mostrarSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        // esta forma de usar setState es para evitar que pasen cosas raras
        // porque es asincrono
        this.setState((prevState) => {
            return {mostrarSideDrawer : !prevState.mostrarSideDrawer}
        });
    }

    render() {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer mostrar={this.state.mostrarSideDrawer} cerrado={this.sideDrawerCerradoHandler} />
                <main className={estilos.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;
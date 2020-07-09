import React, {Fragment, Component} from "react";
import { connect } from "react-redux";
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
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <SideDrawer
                    mostrar={this.state.mostrarSideDrawer}
                    cerrado={this.sideDrawerCerradoHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <main className={estilos.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);
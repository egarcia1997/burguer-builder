import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from "./containers/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { authCheckState } from "./store/actions/index";
import { connect } from 'react-redux';

const Checkout = React.lazy(() => {
    return import("./containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
    return import("./containers/Orders/Orders");
});
const Auth = React.lazy(() => {
    return import("./containers/Auth/Auth");
});

const App = props => {
    useEffect(() => {
        props.onTryAutoSignup();
    }, []);

    let routes = (
        <Switch>
            <Route path="/auth" render={() => <Auth />} />
            <Route path="/" component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );
    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/orders" render={() => <Orders />} />
                <Route path="/checkout" render={() => <Checkout />} />
                <Route path="/auth" render={() => <Auth />} />
                <Route path="/logout" component={Logout} />
                <Route path="/" component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }
    return (
        <div>
            <Layout>
                {/* cuando uso React.lazy, todo lo que use con eso */}
                {/* tengo que meter adentro de Suspense */}
                {/* el atributo fallback es lo que muestra mientras esta cargando algo */}
                <Suspense fallback={<p>Cargando...</p>}>
                    {/* no es necesario usar exact y Switch a la vez */}
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

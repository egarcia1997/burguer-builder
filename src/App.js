import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from "./containers/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import { authCheckState } from "./store/actions/index";
import { connect } from 'react-redux';

const asyncCheckout = asyncComponent(() => {
    return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
    return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
    return import("./containers/Auth/Auth");
});

const App = props => {
    useEffect(() => {
        props.onTryAutoSignup();
    }, []);

    let routes = (
        <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );
    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/orders" component={asyncOrders} />
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/auth" component={asyncAuth} />
                <Route path="/logout" component={Logout} />
                <Route path="/" component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }
    return (
        <div>
            <Layout>
                {/* no es necesario usar exact y Switch a la vez */}
                {routes}
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

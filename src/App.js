import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from "./containers/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders';

class App extends Component {
    render () {
        return (
            <div>
                <Layout>
                    {/* no es necesario usar exact y Switch a la vez */}
                    <Switch>
                        <Route path="/orders" component={Orders} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/" component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;

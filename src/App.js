import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";

class App extends Component {
    render () {
        return (
            <div>
                <Layout>
                    {/* no es necesario usar exact y Switch a la vez */}
                    {/* pero lo hago igual para mostrar las dos cosas */}
                    <Switch>
                        <Route path="/" exact={true} component={BurgerBuilder} />
                        <Route path="/checkout" component={Checkout} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;

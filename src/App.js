import React from 'react';
import Layout from "./containers/Layout/Layout";
import BurguerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";

function App() {
  return (
    <div>
      <Layout>
        <BurguerBuilder />
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;

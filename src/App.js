import React, {Fragment} from 'react';
import Layout from "./containers/Layout/Layout";
import BurguerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <Fragment>
      <Layout>
        <BurguerBuilder></BurguerBuilder>
      </Layout>
    </Fragment>
  );
}

export default App;

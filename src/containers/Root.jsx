import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Layout from "./layouts/Layout";
import Home from "./Home";
import Reclamation from "./Reclamation";

export default props => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Reclamation" component={Reclamation}/>
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

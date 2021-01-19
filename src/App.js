import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/">
          <Dashboard></Dashboard>
        </PrivateRoute>

        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import Login from "./login/Login.jsx";
import Loading from "./common/loading.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/loading" component={Loading} />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

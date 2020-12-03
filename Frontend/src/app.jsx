import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import stores from "./store/store.jsx";
import Login from "./login/Login.jsx";
import Loading from "./common/loading.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/loading" component={Loading} />
          <Redirect path="*" to="/" />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

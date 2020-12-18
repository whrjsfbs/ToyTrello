import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import stores from "./store/store.jsx";
import Landing from "./landing/Landing.jsx";
import Loading from "./common/loading.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/loading" component={Loading} />
          <Redirect path="*" to="/" />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

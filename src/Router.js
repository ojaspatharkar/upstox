import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
import Overview from "./Overview";
import Livechart from "./Livechart";

export default function Router() {
  return (
    <BrowserRouter>
      <div >
        <div className="tab">
          <div className="button">
            <NavLink activeClassName="active" style={{ textDecoration: 'none' }} to="/overview">Overview</NavLink>
          </div>
          <div className="button">
            <NavLink activeClassName="active" style={{ textDecoration: 'none' }} to="/livechart">Live chart</NavLink>
          </div>
        </div>
        <hr />

        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                  <Redirect to="/overview" />
              )
            }}
          />
          <Route exact path="/overview">
            <Overview />
          </Route>
          <Route path="/livechart">
            <Livechart />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
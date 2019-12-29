import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/landingPage";
import PublicPage from "./components/publicPage";
import PrivatePage from "./components/privatePage";
import LoginPage from "./components/loginPage";
import Auth from "./functions/auth";
import WithAuth from "./components/withAuth";

// const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       Auth.getAuth() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: "/login" }} />
//       )
//     }
//   ></Route>
// );

function App() {
  return (
    <div>
      <h3>App</h3>
      <LandingPage />
      <Switch>
        <Route path="/public" component={PublicPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/protected" component={WithAuth(PrivatePage)} />
      </Switch>
    </div>
  );
}

export default App;

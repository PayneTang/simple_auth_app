import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import PrivatePage1 from "./privatePage1";
import PrivatePage2 from "./privatePage2";
import PrivatePage3 from "./privatePage3";

const PrivatePage = () => {
  return (
    <div>
      <h4>Private Page</h4>
      <Link to="/protected/page1">Page1</Link>
      <br />
      <Link to="/protected/page2">Page2</Link>
      <br />
      <Link to="/protected/page3">Page3</Link>
      <br />
      <h5>Start</h5>
      <Switch>
        <Route path="/protected/page1" component={PrivatePage1} />
        <Route path="/protected/page2" component={PrivatePage2} />
        <Route path="/protected/page3" component={PrivatePage3} />
        <Redirect from="*" to="/protected/page1" />
      </Switch>
      <h5>End</h5>
    </div>
  );
};

export default PrivatePage;

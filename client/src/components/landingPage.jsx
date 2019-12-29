import React from "react";
import { Link } from "react-router-dom";
import Auth from "../functions/auth";
import axios from "axios";

const LandingPage = () => {
  return (
    <div style={{}}>
      <h4>Landing Page</h4>
      <Link to="/public">Public</Link>
      <br />
      <Link to="/protected">Protected</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      {/* <button onClick={() => login()}>Login</button>
      <button onClick={() => logout()}>Logout</button> */}
    </div>
  );
};

export default LandingPage;

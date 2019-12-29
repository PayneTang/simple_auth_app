import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

const LoginPage = props => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleUsernameChange = e => {
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = async e => {
    console.log("history", history);
    console.log("location", location);
    e.preventDefault();
    const resp = await axios.post("/users/login", {
      username,
      password
    });
    const respData = resp.data;
    console.log(respData);
    if (!respData.success) {
      setMessage(respData.message);
      history.replace(from);
      // props.history.push("public");
    } else {
      console.log("success");
      // props.history.push("public");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Login Page</h3>
        <input
          name="username"
          value={username}
          onChange={e => handleUsernameChange(e)}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => handlePasswordChange(e)}
        />
        <br />
        <button>Login</button>
        <div>{message}</div>
      </form>
    </div>
  );
};

export default LoginPage;

import React, { useState, useContext } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";
import { useEffect } from "react";

export default function Login() {
  const { dispatch } = useContext(StateContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Updated to use the /auth/login endpoint
  const [user, login] = useResource((username, password) => ({
    url: "/auth/login",
    method: "post",
    data: { username, password },
  }));

  useEffect(() => {
    if (user && user.isLoading === false) {
      if (user.data) {
        // Dispatch the LOGIN action with the received token
        dispatch({
          type: "LOGIN",
          username: username, // Assuming username is what you want to store
          access_token: user.data.access_token,
        });
        setLoginError("");
      } else if (user.error) {
        setLoginError("Invalid credentials. Please try again.");
      }
    }
  }, [user, username, dispatch]);

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoginError("");
    login(username, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="login-username">Username:</label>
      <input
        type="text"
        name="login-username"
        id="login-username"
        value={username}
        onChange={handleUsername}
      />

      <label htmlFor="login-password">Password:</label>
      <input
        type="password"
        name="login-password"
        id="login-password"
        value={password}
        onChange={handlePassword}
      />

      {loginError && <div>{loginError}</div>}
      <input
        type="submit"
        value="Login"
        disabled={username.length === 0 || password.length === 0}
      />
    </form>
  );
}

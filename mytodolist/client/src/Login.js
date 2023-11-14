import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";
import bcrypt from "bcryptjs"; 

export default function Login() {
  const { dispatch } = useContext(StateContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

 
  const [usersResult, getUsers] = useResource(() => ({
    url: "/users",
    method: "get",
  }));

  useEffect(() => {
    getUsers();
  }, [getUsers]);

   useEffect(() => {
     if (usersResult && usersResult.data) {
       const foundUser = usersResult.data.find(
         (user) => user.email === username
       );
       if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
         dispatch({ type: "LOGIN", username: foundUser.email });
         setLoginError("");
       } else if (foundUser) {
         setLoginError("Incorrect password. Please try again.");
       } else {
         setLoginError("Email not registered. Please register.");
       }
     }
   }, [usersResult, username, password, dispatch]);

   function handleUsername(evt) {
     setUsername(evt.target.value);
   }

   function handlePassword(evt) {
     setPassword(evt.target.value);
   }


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoginError("");
        getUsers();
      }}
    >
      <label htmlFor="login-username">Email:</label>
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
        value={password}
        onChange={handlePassword}
        name="login-password"
        id="login-password"
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

import React, { useState, useEffect } from "react";
import { useResource } from "react-request-hook";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [status, setStatus] = useState("");

  const [user, register] = useResource((username, password) => ({
    url: "/auth/register",
    method: "post",
    data: { username, password, passwordConfirmation: password },
  }));

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handlePasswordRepeat(evt) {
    setPasswordRepeat(evt.target.value);
  }

  function handleRegister(e) {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setStatus("Passwords do not match"); // Update status instead of alert
    } else {
      register(username, password);
      setStatus("Registering..."); // Optional: Set a status message for registering
    }
  }

  useEffect(() => {
    if (user && user.isLoading === false) {
      if (user.error) {
        setStatus("Registration failed, please try again later.");
      } else if (user.data) {
        setStatus("Registration successful. You may now login.");
      }
    }
  }, [user]);

  return (
    <form onSubmit={handleRegister}>
      <label htmlFor="register-username">Username:</label>
      <input
        type="text"
        value={username}
        onChange={handleUsername}
        name="register-username"
        id="register-username"
        required
      />

      <label htmlFor="register-password">Password:</label>
      <input
        type="password"
        value={password}
        onChange={handlePassword}
        name="register-password"
        id="register-password"
      />

      <label htmlFor="register-password-repeat">Repeat password:</label>
      <input
        type="password"
        value={passwordRepeat}
        onChange={handlePasswordRepeat}
        name="register-password-repeat"
        id="register-password-repeat"
      />

      <input
        type="submit"
        value="Register"
        disabled={
          username.length === 0 ||
          password.length === 0 ||
          password !== passwordRepeat
        }
      />
      {status && <p>{status}</p>}
    </form>
  );
}

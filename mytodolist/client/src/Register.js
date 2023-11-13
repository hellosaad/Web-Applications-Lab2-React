import React, { useState, useContext } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook"; // Import the useResource hook
import { useEffect } from "react";

export default function Register() {
  const { dispatch } = useContext(StateContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  // Define the useResource hook for POST to create a new user
  const [userRegister, register] = useResource((email, password) => ({
    url: "http://localhost:4000/users", // The endpoint for user registration
    method: "post",
    data: { email, password },
  }));

  function handleEmail(evt) {
    setEmail(evt.target.value);
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
     alert("Passwords do not match");
   } else {
     // Call the register function directly
     register(email, password);
     // After calling register, the userRegister object will be updated with the response
   }
 }

 // ... later in your component, where you can handle the result
 useEffect(() => {
   if (userRegister && userRegister.data) {
     // Handle the successful registration
     dispatch({ type: "REGISTER", username: email });
     // Navigate the user to a different page or clear the form
   }
   // Handle errors if any
   if (userRegister && userRegister.error) {
     // Handle the registration error
     console.error("Registration failed:", userRegister.error);
   }
 }, [userRegister, dispatch, email]);


  return (
    <form onSubmit={handleRegister}>

      <label htmlFor="register-email">Email:</label>
      <input
        type="email"
        value={email}
        onChange={handleEmail}
        name="register-email"
        id="register-email"
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
          email.length === 0 ||
          password.length === 0 ||
          password !== passwordRepeat
        }
      />
    </form>
  );
}

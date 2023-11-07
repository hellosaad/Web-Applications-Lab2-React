import React, { useContext } from "react";
import { StateContext } from "./contexts"; // Import the StateContext

export default function Logout() {
  const { state, dispatch } = useContext(StateContext); // Use useContext to access state and dispatch

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" }); // Dispatch logout action
      }}
    >
      Logged in as: <b>{state.user}</b> {/* Access user from state */}
      <br />
      <br />
      <input type="submit" value="Logout" />
    </form>
  );
}

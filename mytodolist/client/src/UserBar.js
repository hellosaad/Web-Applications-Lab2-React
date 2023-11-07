import React, { useContext } from "react";
import { StateContext } from "./contexts"; // Import the StateContext
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function UserBar() {
  const { state, dispatch } = useContext(StateContext); // Use useContext to access state and dispatch

  if (state.user) {
    return <Logout user={state.user} dispatch={dispatch} />;
  } else {
    return (
      <>
        <Login dispatch={dispatch} />
        <Register dispatch={dispatch} />
      </>
    );
  }
}

// TodoList.js

import React, { useContext } from "react";
import "./TodoList.css";
import { StateContext } from "./contexts";
import Todo from "./Todo";

export default function TodoList() {
  const { state } = useContext(StateContext);

  // Check if a user is logged in
  if (!state.user || !state.user.username) {
    return null; // or you can return a message like "Please log in to view todos"
  }

  return (
    <div className="todo-list-container">
      {state.todos.map((todo, index) => (
        <Todo {...todo} key={index} id={todo._id} />
      ))}
    </div>
  );
}

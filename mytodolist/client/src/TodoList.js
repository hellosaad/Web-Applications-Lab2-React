import React, { useContext } from "react";
import "./TodoList.css";
import { StateContext } from "./contexts"; // Import the StateContext
import Todo from "./Todo";

export default function TodoList() {
  const { state, dispatch } = useContext(StateContext); // Use useContext to access state and dispatch

  return (
    <div className="todo-list-container">
      {state.todos.map((todo) => (
        <Todo {...todo} dispatch={dispatch} key={todo.id} /> // Use todo.id for the key instead of uuidv4()
      ))}
    </div>
  );
}

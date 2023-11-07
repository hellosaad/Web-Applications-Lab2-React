import React, { useContext } from "react";
import "./TodoList.css";
import { StateContext } from "./contexts"; 
import Todo from "./Todo";

export default function TodoList() {
  const { state, dispatch } = useContext(StateContext); 
  return (
    <div className="todo-list-container">
      {state.todos.map((todo) => (
        <Todo {...todo} dispatch={dispatch} key={todo.id} /> 
      ))}
    </div>
  );
}

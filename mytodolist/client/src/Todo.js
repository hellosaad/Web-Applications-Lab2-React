import React, { useContext } from "react";
import { StateContext } from "./contexts"; // Import the StateContext
import "./Todo.css";

export default function Todo({
  id,
  title,
  description,
  dateCreated,
  author,
  complete,
  dateCompleted,
}) {
  const { dispatch } = useContext(StateContext); // Use useContext to access dispatch
  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
    }${date.getMinutes()}`;
  };

  return (
    <div className="todo-item">
      <div className="todo-title">{title}</div>
      <div className="todo-description"> Description: {description}</div>
      <div className="todo-details">
        <div>Created: {formatDateAndTime(dateCreated)}</div>
        <br />
        <div>
          Completed:{" "}
          {dateCompleted ? formatDateAndTime(dateCompleted) : "Not completed"}
        </div>
        <br />
        <i>Written by {author}</i>
      </div>
      <div className="todo-checkbox-wrapper">
        <input
          type="checkbox"
          checked={complete}
          onChange={() => dispatch({ type: "TOGGLE_TODO", id })}
        />
        <label className="todo-checkbox-label">Complete</label>
        <br />
      </div>
      <button onClick={() => dispatch({ type: "DELETE_TODO", id })}>
        Delete
      </button>
    </div>
  );
}

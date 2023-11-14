import React, { useContext } from "react";
import { StateContext } from "./contexts"; 
import { useResource } from "react-request-hook";
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
  const { dispatch } = useContext(StateContext);
 const [, toggleTodo] = useResource(({ id, complete, dateCompleted }) => ({
   url: `/posts/${id}`,
   method: "patch",
   data: { complete, dateCompleted },
 }));

  const [, deleteTodo] = useResource((id) => ({
    url: `/posts/${id}`,
    method: "delete",
  }));
  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
    }${date.getMinutes()}`;
  };
const handleToggle = () => {
  const updatedDateCompleted = !complete ? new Date().toISOString() : null;
  toggleTodo({ id, complete: !complete, dateCompleted: updatedDateCompleted });
  dispatch({ type: "TOGGLE_TODO", id, dateCompleted: updatedDateCompleted });
};

// Modify the onClick handler for the delete button
const handleDelete = () => {
  deleteTodo(id);
  dispatch({ type: "DELETE_TODO", id });
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
        <input type="checkbox" checked={complete} onChange={handleToggle} />
        <label className="todo-checkbox-label">Complete</label>
        <br />
      </div>
     <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

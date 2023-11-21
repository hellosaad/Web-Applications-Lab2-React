import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";
import "./Todo.css";

export default function Todo({
  id,
  title,
  description,
  dateCreated,
  complete: initialComplete,
  dateCompleted: initialDateCompleted,
}) {
  const { state, dispatch } = useContext(StateContext);

  const [complete, setComplete] = useState(initialComplete);
  const [dateCompleted, setDateCompleted] = useState(initialDateCompleted);

  const [toggleTodoState, toggleTodo] = useResource(
    ({ id, complete, dateCompleted }) => ({
      url: `/todo/${id}`,
      method: "put",
      headers: {
        Authorization: `${state.user.access_token}`,
      },
      data: { complete, dateCompleted },
    })
  );

  const [deleteTodoState, deleteTodo] = useResource((id) => ({
    url: `/todo/${id}`,
    method: "delete",
    headers: {
      Authorization: `${state.user.access_token}`,
    },
  }));

  const handleToggle = () => {
    const newCompleteStatus = !complete;
    const newDateCompleted = newCompleteStatus
      ? new Date().toISOString()
      : null;

    setComplete(newCompleteStatus);
    setDateCompleted(newDateCompleted);

    toggleTodo({
      id,
      complete: newCompleteStatus,
      dateCompleted: newDateCompleted,
    });
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  useEffect(() => {
    if (toggleTodoState && toggleTodoState.data) {
      dispatch({ type: "UPDATE_TODO", id: id, payload: toggleTodoState.data });
    }
    if (
      deleteTodoState &&
      deleteTodoState.isLoading === false &&
      deleteTodoState.error === null
    ) {
      dispatch({ type: "DELETE_TODO", id: id });
    }
  }, [toggleTodoState, deleteTodoState, dispatch, id]);

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
        <i>Written by {state.user.username}</i>
      </div>
      <div className="todo-checkbox-wrapper">
        <input type="checkbox" checked={complete} onChange={handleToggle} />
        <label className="todo-checkbox-label">Complete</label>
        <br />
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

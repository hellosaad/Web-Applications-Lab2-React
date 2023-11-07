import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./contexts";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { state, dispatch } = useContext(StateContext); 

  const [todoResponse, createTodo] = useResource(
    ({ title, description, author }) => ({
      url: "/posts",
      method: "post",
      data: {
        title,
        description,
        author,
        dateCreated: Date.now(),
        complete: false,
      },
    })
  );

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleCreate() {
    if (state.user && title.trim()) {
      createTodo({ title, description, author: state.user });
    } else {
      alert(
        "Please enter a title for the todo and make sure you are logged in."
      );
    }
  }

  
  useEffect(() => {
    if (todoResponse && todoResponse.data) {
      dispatch({ type: "CREATE_TODO", newTodo: todoResponse.data });
      setTitle("");
      setDescription("");
    }
  }, [todoResponse, dispatch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div>
        Author: <b>{state.user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <div>
        <label htmlFor="create-description">Description:</label>
        <textarea
          name="create-description"
          id="create-description"
          value={description}
          onChange={handleDescription}
        />
      </div>
      <input type="submit" value="Create" />
    </form>
  );
}
import { useState, useEffect } from "react";
import { useResource } from "react-request-hook";

export default function CreateTodo({ user, dispatch }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Define the useResource hook for creating a new todo
  const [todoResponse, createTodo] = useResource(
    ({ title, description, author }) => ({
      url: "/posts", // Make sure this is the correct endpoint for your API
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
    if (user && title.trim()) {
      createTodo({ title, description, author: user });
    } else {
      alert(
        "Please enter a title for the todo and make sure you are logged in."
      );
    }
  }

  // Effect to run when the response of the createTodo resource changes
  useEffect(() => {
    if (todoResponse && todoResponse.data) {
      dispatch({ type: "CREATE_TODO", newTodo: todoResponse.data });
      setTitle("");
      setDescription("");
    }
    // Optionally handle error here
  }, [todoResponse, dispatch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div>
        Author: <b>{user}</b>
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

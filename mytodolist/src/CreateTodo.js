import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
export default function CreateTodo({ user, handleAddTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleDescription(evt) {
    setDescription(evt.target.value);
  }
  function handleCreate() {
    const newTodo = {
      id: uuidv4(),
      title,
      description,
      dateCreated: Date.now(),
      author: user,
    };
    handleAddTodos(newTodo);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
         if (!title.trim()) {
           alert("Title can not be empty!");
           return;
         }
        handleCreate();
      }}>
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <label>Description: </label>
      <textarea value={description} onChange={handleDescription} />
      <input type="submit" value="Create" />
    </form>
  );
}

import { useState } from "react";
import CreateTodo from "./CreateTodo";
import UserBar from "./UserBar";
import TodoList from "./TodoList";

function App() {
  const [user, setUser] = useState("");
  const initalTodos = [
    {
      id: 1,
      title: "Title1",
      description: "This is Todo1",
      dateCreated: Date.now(),
      dateCompleted: Date.now(),
      author:"Author1"
    },
    {
      id: 2,
      title: "Title2",
      description: "This is Todo2",
      dateCreated: Date.now(),
      dateCompleted: Date.now(),
      author:'Author2'
    },
    {
      id: 1,
      title: "Title3",
      description: "This is Todo3",
      dateCreated: Date.now(),
      dateCompleted: Date.now(),
      author: 'Author3'
    },
  ];

  const [todos, setTodos] = useState(initalTodos);

  const handleAddTodos = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };
  return (
    <div>
      <UserBar user={user} setUser={setUser} />
      <CreateTodo user={user} handleAddTodos={handleAddTodos} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;

import { useState } from "react";
import CreateTodo from "./CreateTodo";
import UserBar from "./UserBar";
import TodoList from "./TodoList";
import './App.css';
function App() {
  const [user, setUser] = useState("");
  const initalTodos = [
    {
      id: 1,
      title: "Go to the Gym",
      description: "Chest Day today",
      dateCreated: Date.now(),
      dateCompleted: null,
      author: "Saad",
      complete: false,
    },
    {
      id: 2,
      title: "Buy Milk",
      description: "Buy milk from target",
      dateCreated: Date.now(),
      dateCompleted: null,
      author: "Madiha",
      complete: false,
    }
  
  ];

  const [todos, setTodos] = useState(initalTodos);

  const handleAddTodos = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };
 const handleToggleComplete = (id) => {
   setTodos((initalTodos) => {
     return initalTodos.map((todo) => {
       if (todo.id === id) {
         return {
           ...todo,
           complete: !todo.complete,
           dateCompleted: !todo.complete ? Date.now() : null,
         };
       }
       return todo;
     });
   });
 };
  return (
    <div>
      <UserBar user={user} setUser={setUser} />
      <CreateTodo user={user} handleAddTodos={handleAddTodos} />
      <TodoList todos={todos} onToggleComplete={handleToggleComplete} />
    </div>
  );
}

export default App;

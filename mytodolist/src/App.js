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
      author: "Author1",
      complete: false,
    },
    {
      id: 2,
      title: "Title2",
      description: "This is Todo2",
      dateCreated: Date.now(),
      dateCompleted: null,
      author: "Author2",
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

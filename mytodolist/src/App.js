import { useReducer } from "react";
import CreateTodo from "./CreateTodo";
import UserBar from "./UserBar";
import TodoList from "./TodoList";
import { userReducer, todoReducer } from "./reducers";
import './App.css';

function App() {
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
    },
  ];
  
  const [user, userDispatch] = useReducer(userReducer, '');
  const [todos, todosDispatch] = useReducer(todoReducer, initalTodos);

  return (
    <div>
      <UserBar user={user} dispatch={userDispatch} />
      <CreateTodo user={user} dispatch={todosDispatch} />
      <TodoList todos={todos} dispatch={todosDispatch} />
    </div>
  );
}

export default App;




  
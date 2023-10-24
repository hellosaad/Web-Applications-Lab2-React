import './TodoList.css'
import { v4 as uuidv4 } from "uuid"
import Todo from "./Todo";
export default function TodoList({ todos = [] , dispatch}) {
  return (
    <div className='todo-list-container'>
      {todos.map((p, i) => (
        <Todo {...p} dispatch={dispatch} key={uuidv4()}/>
      ))}
    </div>
  );
}

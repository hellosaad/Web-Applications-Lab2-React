import {v4 as uuidv4} from "uuid"
import Todo from "./Todo";
export default function TodoList({ todos = [] }) {
  return (
    <div>
      {todos.map((p, i) => (
        <Todo {...p} key={uuidv4()} />
      ))}
    </div>
  );
}

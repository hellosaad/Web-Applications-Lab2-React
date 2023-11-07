import { useReducer, useEffect } from "react";
import { useResource } from "react-request-hook";
import CreateTodo from "./CreateTodo";
import UserBar from "./UserBar";
import TodoList from "./TodoList";
import { userReducer, todoReducer } from "./reducers";
import "./App.css";

function App() {
  const [user, userDispatch] = useReducer(userReducer, "");
  const [todos, todosDispatch] = useReducer(todoReducer, []);

  // Define the useResource Hook for GET /posts
  const [postsResult, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));

  // Fetch posts when the component mounts
  useEffect(() => {
    getPosts();
  }, []); // Empty array ensures this only runs once on mount

  // Dispatch an action when the posts are successfully fetched
  useEffect(() => {
    if (postsResult && postsResult.data) {
      // Transform the posts to match the expected format of todos
      const transformedTodos = postsResult.data.map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        dateCreated: post.dateCreated || Date.now(),
        dateCompleted: post.dateCompleted,
        author: post.author,
        complete: post.complete,
      }));
      todosDispatch({ type: "FETCH_TODOS", todos: transformedTodos });
    }
  }, [postsResult]);

  return (
    <div className="App">
      <UserBar user={user} dispatch={userDispatch} />
      <CreateTodo user={user} dispatch={todosDispatch} />
      <TodoList todos={todos} dispatch={todosDispatch} />
    </div>
  );
}
export default App;

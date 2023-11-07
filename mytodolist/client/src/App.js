import React, { useReducer, useEffect, useContext } from "react";
import { StateContext } from "./contexts";
import appReducer from "./reducers";
import { useResource } from "react-request-hook";
import CreateTodo from "./CreateTodo";
import UserBar from "./UserBar";
import TodoList from "./TodoList";
import "./App.css";

function App() {
  // Use the combined reducer for your entire app's state management
  const [state, dispatch] = useReducer(appReducer, { user: "", todos: [] });

  // Define the useResource Hook for GET /posts
  const [postsResult, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));

  // Fetch posts when the component mounts
  useEffect(() => {
    getPosts();
  }, [getPosts]); // Ensure getPosts is listed in the dependency array

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
      dispatch({ type: "FETCH_TODOS", todos: transformedTodos });
    }
  }, [postsResult, dispatch]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {" "}
      {/* Wrap your components with StateContext.Provider */}
      <div className="App">
        <UserBar /> {/* UserBar now gets state and dispatch from context */}
        <CreateTodo />{" "}
        {/* CreateTodo now gets state and dispatch from context */}
        <TodoList /> {/* TodoList now gets state and dispatch from context */}
      </div>
    </StateContext.Provider>
  );

}

export default App;

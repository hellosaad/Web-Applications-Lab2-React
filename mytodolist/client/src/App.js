import React, { useReducer, useEffect } from "react";
import { StateContext } from "./contexts";
import appReducer from "./reducers";
import { useResource } from "react-request-hook";
import CreateTodo from "./CreateTodo";
import UserBar from "./UserBar";
import TodoList from "./TodoList";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(appReducer, { user: "", todos: [] });

  const [postsResult, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));

  useEffect(() => {
    getPosts();
  }, [getPosts]); 

  useEffect(() => {
    if (postsResult && postsResult.data) {
      
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
      
      <div className="App">
        <UserBar /> 
        <CreateTodo />{" "}
       
        <TodoList /> 
      </div>
    </StateContext.Provider>
  );

}

export default App;

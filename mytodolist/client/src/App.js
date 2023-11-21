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

  const [todosResult, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: {
      Authorization: `${state.user.access_token}`,
    },
  }));

  useEffect(() => {
    if (state.user) {
      getTodos();
    }
  }, [getTodos, state.user]);

  useEffect(() => {
    if (todosResult && todosResult.data) {
      dispatch({ type: "FETCH_TODOS", todos: todosResult.data.todos });
    }
  }, [todosResult, dispatch]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <UserBar />
        {state.user && <CreateTodo />}
        <TodoList />
      </div>
    </StateContext.Provider>
  );
}

export default App;

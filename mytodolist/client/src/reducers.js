// reducers.js

export function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        ...state, 
        username: action.username,
        access_token: action.access_token,
      };
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}



export function todoReducer(state, action) {
  switch (action.type) {
    case "FETCH_TODOS":
      return action.todos;
    case "CREATE_TODO":
      return [action.newTodo, ...state];
    case "UPDATE_TODO":
      return state.map((todo) => {
        if (todo._id === action.id) {
          return {
            ...todo,
            complete: action.payload.complete,
            dateCompleted: action.payload.dateCompleted,
          };
        }
        return todo;
      });

    case "DELETE_TODO":
      return state.filter((todo) => todo._id !== action.id);
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}

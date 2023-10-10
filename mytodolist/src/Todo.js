import './Todo.css'
export default function Todo({
  id,
  title,
  description,
  dateCreated,
  author,
  complete,
  dateCompleted,
  onToggleComplete
}) {
  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
    }${date.getMinutes()}`;
  };
  return (
    <div className="todo-item">
      <div className="todo-title">{title}</div>
      <div className="todo-description"> Description: {description}</div>
      <div className="todo-details">
        <div>Created: {formatDateAndTime(dateCreated)}</div>
        <br></br>
        <div>Completed:{" "} {dateCompleted ? formatDateAndTime(dateCompleted) : "Not completed"}</div>
        <br></br>
        <i>Written by {author}</i>
      </div>
      <div className="todo-checkbox-wrapper">
        <input
          type="checkbox"
          checked={complete}
          onChange={() => onToggleComplete(id)}
        />{" "}
        <label className="todo-checkbox-label">Complete</label>
        <br />
      </div>
    </div>
  );
}

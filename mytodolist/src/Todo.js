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
  return (
    <div>
      <h3>{title}</h3>
      <i>
        Description: <b>{description}</b>
      </i>
      <div>dateCreated: {dateCreated}</div>
      <div>dateCompleted: {dateCompleted}</div>
      <i>Written by {author}</i>
      <br />
      <input
        type="checkbox"
        checked={complete}
        onChange={() => onToggleComplete(id)}
      />{" "}
      Complete
      <br />
    </div>
  );
}

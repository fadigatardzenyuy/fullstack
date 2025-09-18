import { useState, useEffect } from "react";

function TodoList({ session }) {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [inputError, setInputError] = useState("");

  // This useEffect will run once when the component mounts
  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/todos", {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    const data = await response.json();
    // Defensive coding: ensure we always have an array to work with.
    setTodos(data.todos || []);
    setLoading(false);
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setInputError("Task cannot be empty");
      return;
    }
    setInputError("");
    await fetch("http://localhost:4000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ task: task }),
    });
    setTask("");
    fetchTodos();
  };

  const handleDeleteTodo = async (id) => {
    await fetch(`http://localhost:4000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    fetchTodos();
  };

  if (loading)
    return (
      <div className="todo-loading">
        <div className="loader"></div>Loading todos...
      </div>
    );

  return (
    <div className="todo-container">
      <form onSubmit={handleCreateTodo} className="todo-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          className={inputError ? "input-error" : ""}
        />
        <button type="submit">Add</button>
      </form>
      {inputError && <div className="todo-error">{inputError}</div>}
      <ul className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="todo-card todo-row">
              <label className="todo-checkbox">
                <input type="checkbox" disabled />
                <span className="checkmark"></span>
              </label>
              <span className="todo-task">{todo.task}</span>
              <button
                className="delete-btn icon-btn"
                title="Delete task"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6L14 14M6 14L14 6"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </li>
          ))
        ) : (
          <p className="todo-empty">No tasks yet. Add one!</p>
        )}
      </ul>
    </div>
  );
}

export default TodoList;

import { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import TodoList from "./components/TodoList";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const activeSession = JSON.parse(localStorage.getItem("session"));
    if (activeSession) {
      setSession(activeSession);
    }
  }, []);

  const handleLoginSuccess = (sessionData) => {
    setSession(sessionData);
    // Persist the session to localStorage
    localStorage.setItem("session", JSON.stringify(sessionData));
  };

  const handleLogout = () => {
    setSession(null);
    // Clear the session from localStorage
    localStorage.removeItem("session");
  };

  return (
    <div className="app-bg">
      {!session ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="todo-main-card">
          <h1 className="todo-main-title">My Todos</h1>
          <p className="todo-main-welcome">
            Welcome, <strong>{session.user.email}</strong>!
          </p>
          <TodoList session={session} />
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
export default App;

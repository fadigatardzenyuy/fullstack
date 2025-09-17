import { useState } from "react";
import Auth from "./components/Auth";
import "./index.css";

function App() {
  const [session, setSession] = useState(null);

  const handleLoginSuccess = (sessionData) => {
    setSession(sessionData);
    console.log(
      "Login successful! Session data stored in App state:",
      sessionData
    );
  };

  const handleLogout = () => {
    setSession(null);
  };

  return (
    <>
      {!session ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="container">
          <h1>To-Do List</h1>
          <p>
            Welcome back, <strong>{session.user.email}</strong>!
          </p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </>
  );
}

export default App;

import { useState } from "react";

export default function Auth({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (endpoint) => {
    setLoading(true);
    setError(null);

    // =================================================================
    // TODO: WE WILL WRITE THIS LOGIC TOGETHER IN OUR SESSION
    // This is where we will use the `fetch` API to call our backend.
    // We will need to handle success and error states.
    console.log(`TODO: Call the /api/auth/${endpoint} endpoint.`);
    // =================================================================

    // For now, let's pretend it fails after 2 seconds
    setTimeout(() => {
      setError("API logic not implemented yet.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container">
      <h1>Welcome</h1>
      <p>Sign in or create an account to continue</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => handleAuth("login")} disabled={loading}>
          {loading ? "..." : "Log In"}
        </button>
        <button
          className="secondary"
          onClick={() => handleAuth("signup")}
          disabled={loading}
        >
          {loading ? "..." : "Create New Account"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

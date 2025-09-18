import { useState } from "react";

export default function Auth({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:4000/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      if (endpoint === "login") {
        onLoginSuccess(data.session);
      } else {
        alert("Signup Successful, please log in");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">Welcome</h1>
      <p className="auth-desc">Sign in or create an account to continue</p>

      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <div className="auth-password-row">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <button
            type="button"
            className="auth-eye-btn"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path
                  d="M2 10s2.5-5 8-5 8 5 8 5-2.5 5-8 5-8-5-8-5z"
                  stroke="#1877f2"
                  strokeWidth="1.5"
                />
                <circle
                  cx="10"
                  cy="10"
                  r="2.5"
                  stroke="#1877f2"
                  strokeWidth="1.5"
                />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path
                  d="M2 10s2.5-5 8-5 8 5 8 5-2.5 5-8 5-8-5-8-5z"
                  stroke="#1877f2"
                  strokeWidth="1.5"
                />
                <path d="M4 4l12 12" stroke="#1877f2" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </div>
        <button
          onClick={() => handleAuth("login")}
          disabled={loading}
          className="auth-btn"
        >
          {loading ? "..." : "Log In"}
        </button>
        <button
          type="button"
          className="auth-btn secondary"
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

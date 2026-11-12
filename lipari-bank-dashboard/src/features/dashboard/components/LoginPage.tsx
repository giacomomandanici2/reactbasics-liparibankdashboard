import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth/AuthContext";
import { useState } from "react";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    await auth.login(username, password);
    const from = (location.state as any)?.from?.pathname || "/dashboard";
    navigate(from, { replace: true });
  };

  function handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
    const username = event.target.value;
    setUsername(username);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    setPassword(password);
  }

  return (
    <>
      <h2>Login Page</h2>
      <div>
        <form>
          <div>
            <label>Username / email</label>
            <input
              onChange={handleUsername}
              name="username"
              type="text"
              value={username}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              onChange={handlePassword}
              name="password"
              type="password"
              value={password}
            ></input>
          </div>
        </form>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
}

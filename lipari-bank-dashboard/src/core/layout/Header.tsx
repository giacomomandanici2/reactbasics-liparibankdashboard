import { useAuth } from "../../store/auth/AuthContext";
import { useTheme } from "../../store/theme/ThemeContext";
import NotificationBell from "./NotificationBell";

// barra superiore con logo "🏦 LipariBank" e placeholder utente
//prendi userid da db

function Header() {
  const auth = useAuth();
  const theme = useTheme();
  return (
    <header
      style={{
        backgroundColor: theme.theme === "light" ? "#f0f0f0" : "#333",
        color: theme.theme === "light" ? "#000" : "#fff",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>🏦 LipariBank Dashboard</h1>
      {auth.isAuthenticated && (
        <h2>Ciao, {auth.user?.name ? auth.user?.name : ""}</h2>
      )}
      <div>
        <button onClick={theme.toggleTheme}>🌙 Dark / ☀️ Light</button>
      </div>
      {/* <div className="user-placeholder">👤</div> */}
      <NotificationBell userId="{userId}"></NotificationBell>
    </header>
  );
}
export default Header;

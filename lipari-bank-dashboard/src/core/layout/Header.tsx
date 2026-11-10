import { useAuth } from "../../store/auth/AuthContext";
import { useTheme } from "../../store/theme/ThemeContext";
import NotificationBell from "./NotificationBell";

// barra superiore con logo "🏦 LipariBank" e placeholder utente
//prendi userid da db

function Header() {
  const auth = useAuth();
  const theme = useTheme();
  return (
    <header style={{ backgroundColor: "AccentColor" }}>
      <h1>🏦 LipariBank Dashboard</h1>
      <p>{"-_>" + auth.isAuthenticated}</p>
      {auth.isAuthenticated && (
        <p style={{ color: "red" }}>Ciao, {auth.user?.name}</p>
      )}
      <div>
        <button onClick={theme.toggleTheme}>🌙 Dark / ☀️ Light</button>
      </div>
      <div className="user-placeholder">👤</div>
      <NotificationBell userId="{userId}"></NotificationBell>
    </header>
  );
}
export default Header;

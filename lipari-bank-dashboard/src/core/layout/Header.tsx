import { useAppSelector } from "../../store/hooks";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../store/slices/authSlice";
import { useTheme } from "../../store/theme/ThemeContext";
import NotificationBell from "./NotificationBell";

// barra superiore con logo "🏦 LipariBank" e placeholder utente
//prendi userid da db

function Header() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const theme = useTheme();
  return (
    <div
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
      {isAuthenticated && (
        <h2>Ciao, {user ? `${user.firstName} ${user.lastName}` : ""}</h2>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
        }}
      >
        <button
          style={{
            fontSize: "1.4rem",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
          onClick={theme.toggleTheme}
        >
          🌙 / ☀️
        </button>
        <NotificationBell userId={user?.id ?? ""}></NotificationBell>
      </div>
    </div>
  );
}
export default Header;

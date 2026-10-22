import NotificationBell from "./NotificationBell";

// barra superiore con logo "🏦 LipariBank" e placeholder utente
//prendi userid da db

function Header() {
  return (
    <header>
      <h1>🏦 LipariBank Dashboard</h1>
      <div className="user-placeholder">👤</div>

      <NotificationBell userId="{userId}"></NotificationBell>
    </header>
  );
}
export default Header;

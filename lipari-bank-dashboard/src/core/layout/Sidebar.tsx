import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    //menu verticale con 3 voci: "Dashboard, "conti", "movimenti"
    <aside>
      <nav style={{ display: "flex", flexDirection: "column" }}>
        {/* <ul> */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/accounts"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          Conti
        </NavLink>
        <NavLink
          to="/movements"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          Movimenti
        </NavLink>
        {/* </ul> */}
      </nav>
    </aside>
  );
}
export default Sidebar;

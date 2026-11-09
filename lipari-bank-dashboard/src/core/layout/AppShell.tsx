import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardPage from "../../features/dashboard/DashboardPage";

function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <DashboardPage />
        </main>
      </div>
    </div>
  );
}

export default AppShell;

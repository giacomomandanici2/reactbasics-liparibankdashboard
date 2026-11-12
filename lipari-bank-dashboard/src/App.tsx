import "./App.css";
import AppShell from "./core/layout/AppShell";
import { ProtectedRoute } from "./core/routing/ProtectedRoute";
import AccountDetailPage from "./features/dashboard/components/AccountDetailPage";
import LoginPage from "./features/dashboard/components/LoginPage";
import NotFoundPage from "./features/dashboard/components/NotFoundPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/accounts/:accountId"
              element={<AccountDetailPage />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

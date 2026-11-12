import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import SkeletonLoader from "../../../utils/SkeletonLoader";
import type { Account } from "../DashboardPage";

export default function AccountDetailPage() {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();

  // Guard: se accountId è undefined (cosa non dovrebbe succedere ma TS lo permette)
  if (!accountId) {
    return <Navigate to="/dashboard" replace />;
  }

  const {
    data: account,
    isLoading,
    error,
  } = useApi<Account>(`/api/accounts/${accountId}`);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <div>Errore</div>;
  if (!account) return <div>Conto non trovato</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Indietro</button>
      <h1>{account.name}</h1>
      <p>IBAN: {account.iban}</p>
      <p>Saldo: € {account.balance}</p>
    </div>
  );
}

import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import SkeletonLoader from "../../../utils/SkeletonLoader";
import type { Account } from "../DashboardPage";
import { TransferForm } from "./TransferForm";

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
      <h1>{account.name}</h1>
      <p>IBAN: {account.iban}</p>
      <p>Saldo: € {account.balance}</p>

      <section className="transfer-section">
        <h2>Nuovo bonifico</h2>
        <TransferForm />
      </section>
    </div>
  );
}

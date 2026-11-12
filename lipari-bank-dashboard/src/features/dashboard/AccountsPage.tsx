import AccountCard from "./components/AccountCard";
import { useApi } from "../../hooks/useApi";
import SkeletonLoader from "../../utils/SkeletonLoader";
import type { Account } from "./DashboardPage";

export default function AccountsPage() {
  const {
    data: accounts,
    isLoading,
    error,
    refetch,
  } = useApi<Account[]>("/api/accounts");

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div>
        <h1>Errore caricamento dati</h1>
        <button onClick={refetch}>Riprova</button>
      </div>
    );
  }

  if (!accounts || accounts.length === 0) {
    return <div>Nessun conto disponibile</div>;
  }

  return (
    <section className="accounts-page">
      <h2>Conti</h2>

      <div className="accounts-grid">
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            id={account.id}
            name={account.name}
            iban={account.iban}
            balance={account.balance}
            badge={account.type}
          />
        ))}
      </div>
    </section>
  );
}

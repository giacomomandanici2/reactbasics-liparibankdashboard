import { useState } from "react";
import AccountCard from "./components/AccountCard";
import TransactionList from "./components/TransactionList";
import type { Movement } from "./components/MovementRow";
import { useApi } from "../../hooks/useApi";
import SkeletonLoader from "../../utils/SkeletonLoader";

interface Account {
  id: string;
  name: string;
  type: "PRIVATE" | "BUSINESS";
  balance: number;
  iban: string;
}

const mockMovements: Movement[] = [
  {
    type: "CREDIT",
    date: "",
    description: "",
    amount: 10,
    category: "",
    id: "",
  },
];

export default function DashboardPage() {
  const [movements] = useState<Movement[]>(mockMovements);

  const {
    data: accounts,
    isLoading,
    error,
    refetch,
  } = useApi<Account[]>("/api/accounts");
  if (isLoading) {
    return (
      <div>
        <SkeletonLoader></SkeletonLoader>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>Errore caricamento dati</h1>
        <button onClick={refetch}> Riprova </button>
      </div>
    );
  }
  if (!accounts || accounts.length === 0) {
    return <div>Nessun conto disponibile</div>;
  }

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  );

  return (
    <section className="dashboard-page">
      <h2>Dashboard</h2>

      {!isLoading && !error && (
        <>
          <div className="dashboard-summary">
            <p>Saldo totale</p>
            <strong>
              {new Intl.NumberFormat("it-IT", {
                style: "currency",
                currency: "EUR",
              }).format(totalBalance)}
            </strong>
          </div>

          <div className="accounts-grid">
            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                name={account.name}
                iban={account.iban}
                balance={account.balance}
                badge={account.type}
              />
            ))}
          </div>

          <TransactionList movements={movements} />
        </>
      )}
    </section>
  );
}

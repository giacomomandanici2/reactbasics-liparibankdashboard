import { useEffect, useState } from "react";
import AccountCard from "./components/AccountCard";
import TransactionList from "./components/TransactionList";
import type { Movement } from "./components/MovementRow";

interface Account {
  id: string;
  name: string;
  type: "PRIVATE" | "BUSINESS";
  balance: number;
  iban: string;
}

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // creo un mock di movements
  useEffect(() => {
    mockMovements();
    setIsLoading(false);
  });

  const mockMovements = () => {
    const mockData: Movement[] = [
      {
        type: "CREDIT",
        date: "",
        description: "",
        amount: 10,
        category: "",
        id: "",
      },
    ];
    setMovements(mockData);
    setError(null);
    setAccounts([
      {
        id: "",
        name: "",
        type: "PRIVATE",
        balance: 50,
        iban: "",
      },
    ]);
  };

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  );

  return (
    <section className="dashboard-page">
      <h2>Dashboard</h2>

      {isLoading && <p>Caricamento dati...</p>}

      {error && <p className="dashboard-error">Errore: {error}</p>}

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

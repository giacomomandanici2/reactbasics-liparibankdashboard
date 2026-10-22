import { useState } from "react";

interface Account {
  name: string;
  iban: string;
  balance: number;
  badge: "PRIVATE" | "BUSINESS";
}

// Trasforma AccountCard aggiungendo state:

// Aggiungi useState per isRefreshing (boolean)
// Pulsante "🔄 Aggiorna" che setta isRefreshing = true, attende 1s con setTimeout, poi torna a false
// Pulsante disabilitato durante il refresh

export default function AccountCard(account: Account) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  return (
    <div>
      <h3>{account.name}</h3>
      <p>IBAN:{account.iban.slice(-6)}</p>
      <p>
        Saldo:{" "}
        {new Intl.NumberFormat("it-IT", {
          style: "currency",
          currency: "EUR",
        }).format(account.balance)}
      </p>
      <span>{account.badge}</span>
      <button onClick={handleRefresh} disabled={isRefreshing}>
        🔄 Aggiorna
      </button>
    </div>
  );
}

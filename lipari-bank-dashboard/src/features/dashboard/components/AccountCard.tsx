
interface Account {
  name: string;
  iban: string;
  balance: number;
  badge: "PRIVATE" | "BUSINESS";
}

export default function AccountCard(account: Account) {
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
    </div>
  );
}

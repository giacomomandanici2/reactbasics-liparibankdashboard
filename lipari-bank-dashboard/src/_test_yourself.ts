// Scrivi una funzione tipizzata che prende un numero e ritorna una stringa formattata in valuta italiana.
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

// Scrivi una funzione che da un nome completo ritorna le iniziali maiuscole.
const getInitials = (fullName: string): string => {
  return fullName
    .split("")
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
};

// Definisci un'interface Account e una funzione che somma i saldi di un array.

interface Account {
  id: string;
  name: string;
  balance: number;
}

const accounts: Account[] = [
  { id: "1", name: "A", balance: 1000 },
  { id: "2", name: "B", balance: 2500 },
  { id: "3", name: "C", balance: -300 },
];

const showBalances = (accounts: Account[]) => {
  const totBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  );
};

// Scrivi una funzione async generica che fa fetch e ritorna i dati tipizzati, gestendo gli errori.
async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Account {
  id: string;
  name: string;
  iban: string;
  balance: number;
  type: "PRIVATE" | "BUSINESS";
}

export interface Movement {
  id: string;
  accountId?: string;
  date: string;
  description: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  category: string;
  notes?: string;
}

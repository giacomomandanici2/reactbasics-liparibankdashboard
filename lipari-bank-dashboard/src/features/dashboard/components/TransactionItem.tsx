import type { Movement } from "./MovementRow";

interface TransactionItemProps {
  movement: Movement;
}

const typeMap: any = {
  CREDIT: {
    label: "↑ Entrata",
    color: "green",
  },
  DEBIT: {
    label: "↓ Uscita",
    color: "red",
  },
} as const;

export default function TransactionItem({ movement }: TransactionItemProps) {
  const badge = typeMap[movement.type];

  return (
    <div>
      <span>{movement.description}</span>

      <span style={{ color: badge.color }}>{badge.label}</span>

      <span>{movement.amount.toFixed(2)} €</span>
    </div>
  );
}

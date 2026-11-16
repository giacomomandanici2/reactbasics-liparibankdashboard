import React from "react";
import DOMPurify from "dompurify";
import type { Movement } from "./MovementRow";

interface TransactionItemProps {
  movement: Movement;
  onClick?: (id: string) => void;
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

const TransactionItem = React.memo(function TransactionItem({
  movement,
  onClick,
}: TransactionItemProps) {
  const badge = typeMap[movement.type];

  return (
    <div onClick={() => onClick?.(movement.id)}>
      <span>{movement.description}</span>

      <span style={{ color: badge.color }}>{badge.label}</span>

      <span>{movement.amount.toFixed(2)} €</span>

      {movement.notes && (
        <div
          className="movement-notes"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(movement.notes) }}
        />
      )}
    </div>
  );
});

export default TransactionItem;

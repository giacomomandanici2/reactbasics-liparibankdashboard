//Crea src/features/dashboard/components/MovementRow.tsx:Props: movement: Movement Mostra: data formattata con Intl.DateTimeFormat('it-IT'), descrizione, importo con segno e colore (verde positivo, rosso negativo), badge categoria
import DOMPurify from "dompurify";
import type { Movement } from "../../../types/models";

export type { Movement };

export default function MovementRow(movement: Movement) {
  return (
    <div>
      <h3>
        {new Intl.DateTimeFormat("it-IT").format(new Date(movement.date))}
      </h3>
      <p>Descrizione:{movement.description}</p>
      <p style={{ color: movement.amount > 0 ? "green" : "red" }}>
        Importo:{" "}
        {new Intl.NumberFormat("it-IT", {
          style: "currency",
          currency: "EUR",
        }).format(movement.amount)}
      </p>
      <span>{movement.category}</span>
      {movement.notes && (
        <div
          className="movement-notes"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(movement.notes) }}
        />
      )}
    </div>
  );
}

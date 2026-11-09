import { useReducer } from "react";
import FilterPanel from "./FilterPanel";
import type { Movement } from "./MovementRow";
import { initialState, reducer } from "../../../types";
import TransactionItem from "./TransactionItem";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export default function TransactionList(props: { movements: Movement[] }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchText = state.searchText.toLowerCase();

  const filteredMovements = props.movements.filter((movement) => {
    const matchesSearch =
      movement.description.toLowerCase().includes(searchText) ||
      movement.category.toLowerCase().includes(searchText);
    const matchesType = state.type === "all" || movement.type === state.type;
    return matchesSearch && matchesType;
  });

  const totalCredit = filteredMovements
    .filter((movement) => movement.amount > 0)
    .reduce((sum, movement) => sum + movement.amount, 0);

  const totalDebit = filteredMovements
    .filter((movement) => movement.amount < 0)
    .reduce((sum, movement) => sum + movement.amount, 0);

  return (
    <div className="transaction-list">
      <FilterPanel filters={state} dispatch={dispatch} />

      {filteredMovements.length === 0 ? (
        <p>Nessun movimento trovato.</p>
      ) : (
        <ul>
          {filteredMovements.map((movement) => (
            <TransactionItem movement={movement} key={movement.id} />
          ))}
        </ul>
      )}

      <div className="transaction-totals">
        <p>Entrate: {formatCurrency(totalCredit)}</p>
        <p>Uscite: {formatCurrency(totalDebit)}</p>
      </div>
    </div>
  );
}

import type { Dispatch } from "react";
import type { Action, State } from "../../../types";

// Bottone Reset
export default function FilterPanel(props: {
  filters: State;
  dispatch: Dispatch<Action>;
}) {
  const { filters, dispatch } = props;

  {
    return (
      <div>
        <input
          value={filters.searchText}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH", payload: e.target.value })
          }
        />
        <select
          value={filters.type}
          onChange={(e) =>
            dispatch({
              type: "SET_TYPE",
              payload: e.target.value as State["type"],
            })
          }
        >
          <option value="all">Tutti</option>
          <option value="CREDIT">Entrate</option>
          <option value="DEBIT">Uscite</option>
        </select>
        <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      </div>
    );
  }
}

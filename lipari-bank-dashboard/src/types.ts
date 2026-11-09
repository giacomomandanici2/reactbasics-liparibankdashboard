export interface State {
  searchText: string;
  type: 'all' | 'CREDIT' | 'DEBIT';
}

export type Action =
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_TYPE'; payload: 'all' | 'CREDIT' | 'DEBIT' }
  | { type: 'RESET' };

export const initialState: State = { searchText: '', type: 'all' };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SEARCH': return { ...state, searchText: action.payload };
    case 'SET_TYPE':   return { ...state, type: action.payload };
    case 'RESET':      return initialState;
    default: return state;
  }
}
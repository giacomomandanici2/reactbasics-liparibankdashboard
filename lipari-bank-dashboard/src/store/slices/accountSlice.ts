import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Account } from '../../types/models';

interface AccountState {
  list: Account[];
  selectedId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  list: [],
  selectedId: null,
  isLoading: false,
  error: null,
};

export const fetchAccountsAsync = createAsyncThunk<
  Account[],
  void,
  { rejectValue: string }
>('accounts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('/api/accounts');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : 'Errore');
  }
});

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.list = action.payload;
    },
    selectAccount: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    clearSelection: (state) => {
      state.selectedId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccountsAsync.fulfilled, (state, action: PayloadAction<Account[]>) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchAccountsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Errore sconosciuto';
      });
  },
});

export const { setAccounts, selectAccount, clearSelection } = accountSlice.actions;

export default accountSlice.reducer;

export const selectAccounts = (state: { accounts: AccountState }) => state.accounts.list;
export const selectAccountsLoading = (state: { accounts: AccountState }) => state.accounts.isLoading;
export const selectAccountsError = (state: { accounts: AccountState }) => state.accounts.error;
export const selectSelectedAccount = (state: { accounts: AccountState }) =>
  state.accounts.list.find((a) => a.id === state.accounts.selectedId);

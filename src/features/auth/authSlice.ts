import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../types/auth';
import { setLocalStorage, removeLocalStorage, getLocalStorage } from '../../utils/localStorage';

const initialState: AuthState = {
  isAuthenticated: !!getLocalStorage('session'),
  username: getLocalStorage('username'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;
      setLocalStorage('session', 'active');
      setLocalStorage('username', action.payload);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      removeLocalStorage('session');
      removeLocalStorage('username');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;

export const selectUsername = (state: { auth: AuthState }) => state.auth.username;
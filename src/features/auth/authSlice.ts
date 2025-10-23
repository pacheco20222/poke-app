import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('session'),
  username: localStorage.getItem('username'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.username = action.payload;
            localStorage.setItem('session', 'true')
            localStorage.setItem('username', action.payload);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.username = null;
            localStorage.removeItem('session');
            localStorage.removeItem('username');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
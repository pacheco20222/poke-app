import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PokedexState {
    viewMode: 'list' | 'grid';
    searchQuery: string;
}

const initialState: PokedexState = {
    viewMode: (localStorage.getItem('viewMode') as 'list' | 'grid') || 'list',
    searchQuery: '',
};

const pokedexSlice = createSlice({
    name: 'pokedex',
    initialState,
    reducers: {
        setViewMode: (state, action: PayloadAction<'list' | 'grid'>) => {
            state.viewMode = action.payload;
            localStorage.setItem('viewMode', action.payload);
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setViewMode, setSearchQuery } = pokedexSlice.actions;
export default pokedexSlice.reducer;
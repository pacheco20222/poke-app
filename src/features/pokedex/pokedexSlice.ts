import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import type { ViewMode } from '../../types/pokemon';

interface PokedexState {
    viewMode: ViewMode;
    searchQuery: string;
}

const initialState: PokedexState = {
    viewMode: (getLocalStorage('viewMode') as ViewMode) || 'list',
    searchQuery: '',
};

const pokedexSlice = createSlice({
    name: 'pokedex',
    initialState,
    reducers: {
        setViewMode: (state, action: PayloadAction<ViewMode>) => {
            state.viewMode = action.payload;
            setLocalStorage('viewMode', action.payload);
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        clearSearchQuery: (state) => {
            state.searchQuery = '';
        },
    },
});

export const selectViewMode = (state: { pokedex: PokedexState }) => state.pokedex.viewMode;
export const selectSearchQuery = (state: { pokedex: PokedexState }) => state.pokedex.searchQuery;
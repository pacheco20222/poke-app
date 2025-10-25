import { baseApi } from '../../../app/api';
import { 
  type PokemonListResponse, 
  type PokemonDetail, 
  type PokemonSpecies,
  type AbilityDetail,
  type PokemonMove
} from '../../../types/pokemon';


export const pokeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPokemonList: builder.query<PokemonListResponse, { offset: number; limit: number}>({
            query: ({ offset, limit }) => `/pokemon?offset=${offset}&limit=${limit}`,
            providesTags: ['Pokemon'],
        }),

        getPokemonDetail: builder.query<PokemonDetail, string | number>({
            query: (id) => `/pokemon/${id}`,
            providesTags: (result, error, id) => [{ type: 'Pokemon', id }],
        }),

        getPokemonSpecies: builder.query<PokemonSpecies, string | number>({
            query: (id) => `/pokemon-species/${id}`,
            providesTags: (result, error, id) => [{ type: 'Pokemon', id }],
        }),

        getAbilityDetail: builder.query<AbilityDetail, string>({
            query: (name) => `/ability/${name}`,
            providesTags: (result, error, name) => [{ type: 'Ability', name }],
        }),

        getMoveDetail: builder.query<PokemonMove, string>({
            query: (name) => `/move/${name}`,
            providesTags: (result, error, name) => [{ type: 'Move', name }],
        }),
    }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesQuery,
  useGetAbilityDetailQuery,
  useGetMoveDetailQuery,
} = pokeApi
import { baseApi } from '../../../app/api';
import {
  type PokemonListResponse,
  type PokemonDetail,
  type PokemonSpecies,
  type AbilityDetail,
  type PokemonMove,
} from '../../../types/pokemon';


export const pokeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getPokemonList: builder.query<
      PokemonListResponse,
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) => `/pokemon?offset=${offset}&limit=${limit}`,
      // Provide 'Pokemon' tag for cache invalidation
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ name }) => ({ type: 'Pokemon' as const, id: name })),
              { type: 'Pokemon', id: 'LIST' },
            ]
          : [{ type: 'Pokemon', id: 'LIST' }],
      // Keep this query's cache for 5 minutes (list doesn't change often)
      keepUnusedDataFor: 300,
    }),


    getPokemonDetail: builder.query<PokemonDetail, string | number>({
      query: (id) => `/pokemon/${id}`,
      // Provide specific pokemon tag (enables targeted cache invalidation)
      providesTags: (result, error, id) => [{ type: 'Pokemon', id }],
      // Keep individual pokemon data for 10 minutes
      keepUnusedDataFor: 600,
    }),


    getPokemonSpecies: builder.query<PokemonSpecies, string | number>({
      query: (id) => `/pokemon-species/${id}`,
      providesTags: (result, error, id) => [{ type: 'Species', id }],
      keepUnusedDataFor: 600,
    }),


    getAbilityDetail: builder.query<AbilityDetail, string>({
      query: (name) => `/ability/${name}`,
      providesTags: (result, error, name) => [{ type: 'Ability', id: name }],
      // Abilities never change - cache for 1 hour
      keepUnusedDataFor: 3600,
    }),


    getMoveDetail: builder.query<PokemonMove, string>({
      query: (name) => `/move/${name}`,
      providesTags: (result, error, name) => [{ type: 'Move', id: name }],
      // Moves never change - cache for 1 hour
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesQuery,
  useGetAbilityDetailQuery,
  useGetMoveDetailQuery,
} = pokeApi;
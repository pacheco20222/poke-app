import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import PokemonCard from './PokemonCard';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

interface PokemonGridProps {
    pokemonList: Array<{ name: string; url: string }>;
    hasMore: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
}

export default function PokemonGrid({
  pokemonList,
  hasMore,
  isLoading,
  onLoadMore,
}: PokemonGridProps) {
  // Infinite scroll hook
  const sentinelRef = useInfiniteScroll(onLoadMore, hasMore, isLoading);

  return (
    <Box>
      {/* Pokemon Grid */}
      <Grid container spacing={3}>
        {pokemonList.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
            <PokemonCard name={pokemon.name} url={pokemon.url} />
          </Grid>
        ))}
      </Grid>

      {/* Loading Indicator */}
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
          }}
        >
          <CircularProgress />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Loading more Pokémon...
          </Typography>
        </Box>
      )}

      {/* Sentinel Element (invisible, triggers loading when visible) */}
      {hasMore && !isLoading && (
        <Box
          ref={sentinelRef}
          sx={{
            height: 20,
            margin: 2,
          }}
        />
      )}

      {/* End of List Message */}
      {!hasMore && pokemonList.length > 0 && (
        <Box
          sx={{
            textAlign: 'center',
            padding: 4,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            You've reached the end! All Pokémon loaded.
          </Typography>
        </Box>
      )}

      {/* Empty State */}
      {pokemonList.length === 0 && !isLoading && (
        <Box
          sx={{
            textAlign: 'center',
            padding: 8,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No Pokémon found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search
          </Typography>
        </Box>
      )}
    </Box>
  );
}
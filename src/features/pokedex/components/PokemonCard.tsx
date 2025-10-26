import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { useGetPokemonDetailQuery } from '../services/pokeApi';
import ShinyModal from './ShinyModal';
import {
  capitalizeName,
  formatPokedexNumber,
  getTypeColor,
  getBestSpriteUrl,
} from '../../../utils/formatters';

interface PokemonCardProps {
    name: string;
    url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  const navigate = useNavigate();
  const [showShinyModal, setShowShinyModal] = useState(false);
  const id = url.match(/\/pokemon\/(\d+)\//)?.[1] || '0';
  const { data: pokemon, isLoading, isError } = useGetPokemonDetailQuery(id);
  const handleCardClick = () => {
    navigate(`/pokemon/${id}`);
  };

  const handleShinyClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setShowShinyModal(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (isError || !pokemon) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography color="error">Failed to load {name}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          },
        }}
        onClick={handleCardClick}
      >
        {/* Pokemon Image */}
        <CardMedia
          component="img"
          height="200"
          image={getBestSpriteUrl(pokemon.sprites)}
          alt={pokemon.name}
          sx={{
            objectFit: 'contain',
            backgroundColor: 'grey.100',
            padding: 2,
          }}
        />

        {/* Card Content */}
        <CardContent sx={{ flexGrow: 1 }}>
          {/* Number and Name */}
          <Typography variant="overline" color="text.secondary">
            {formatPokedexNumber(pokemon.id)}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {capitalizeName(pokemon.name)}
          </Typography>

          {/* Types */}
          <Box mb={1}>
            <Stack direction="row" spacing={0.5} flexWrap="wrap">
              {pokemon.types.map((typeInfo) => (
                <Chip
                  key={typeInfo.type.name}
                  label={capitalizeName(typeInfo.type.name)}
                  size="small"
                  sx={{
                    backgroundColor: getTypeColor(typeInfo.type.name),
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 0.5,
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Abilities */}
          <Typography variant="body2" color="text.secondary">
            <strong>Abilities:</strong>{' '}
            {pokemon.abilities
              .slice(0, 2)
              .map((a) => capitalizeName(a.ability.name))
              .join(', ')}
          </Typography>
        </CardContent>

        {/* Card Actions */}
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={handleShinyClick}
            sx={{ ml: 'auto' }}
          >
            ✨ Shiny
          </Button>
        </CardActions>
      </Card>

      {/* Shiny Modal */}
      {pokemon && (
        <ShinyModal
          open={showShinyModal}
          onClose={() => setShowShinyModal(false)}
          pokemonName={pokemon.name}
          sprites={pokemon.sprites}
        />
      )}
    </>
  );
}
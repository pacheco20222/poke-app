// =============================================================================
// WHAT: Pokemon detail page with gallery, info, abilities, and moves
// WHY: Requirement: Shows complete pokemon information
// =============================================================================

import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesQuery,
  useGetAbilityDetailQuery,
  useGetMoveDetailQuery,
} from '../services/pokeApi';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ImageGallery from '../components/ImageGallery';
import AbilitiesList from '../components/AbilitiesList';
import MovesList from '../components/MovesList';
import {
  capitalizeName,
  formatPokedexNumber,
  getTypeColor,
  getSpanishDescription,
} from '../../../utils/formatters';


export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch pokemon data
  const {
    data: pokemon,
    isLoading: pokemonLoading,
    isError: pokemonError,
  } = useGetPokemonDetailQuery(id!);

  const {
    data: species,
    isLoading: speciesLoading,
  } = useGetPokemonSpeciesQuery(id!, {
    skip: !pokemon, 
  });


  const handleBack = () => {
    navigate('/');
  };


  if (pokemonLoading) {
    return <LoadingSpinner message="Loading Pokémon details..." fullScreen />;
  }


  if (pokemonError || !pokemon) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          Failed to load Pokémon details. Please try again.
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Back to List
        </Button>
      </Container>
    );
  }


  const description = species
    ? getSpanishDescription(species.flavor_text_entries)
    : 'Loading description...';

  return (
    <>
      {/* AppBar with Back Button */}
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ ml: 2 }}>
            {capitalizeName(pokemon.name)} {formatPokedexNumber(pokemon.id)}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} lg={6}>
            <Stack spacing={3}>
              {/* Image Gallery */}
              <ImageGallery
                pokemonName={pokemon.name}
                sprites={pokemon.sprites}
              />

              {/* Info Card - Name, Types, Description */}
              <Card elevation={3}>
                <CardContent>
                  {/* Name and Number */}
                  <Typography variant="h4" component="h1" gutterBottom>
                    {capitalizeName(pokemon.name)}
                  </Typography>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    sx={{ mb: 2, display: 'block' }}
                  >
                    {formatPokedexNumber(pokemon.id)}
                  </Typography>

                  {/* Types */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Types
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {pokemon.types.map((typeInfo) => (
                        <Chip
                          key={typeInfo.type.name}
                          label={capitalizeName(typeInfo.type.name)}
                          sx={{
                            backgroundColor: getTypeColor(typeInfo.type.name),
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Description */}
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Description
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {speciesLoading ? 'Loading description...' : description}
                    </Typography>
                  </Box>

                  {/* Physical Stats */}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Physical Stats
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Height:</strong> {pokemon.height / 10} m
                      {' • '}
                      <strong>Weight:</strong> {pokemon.weight / 10} kg
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Abilities Card */}
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Abilities
                  </Typography>
                  <AbilitiesList abilities={pokemon.abilities} />
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right Column - Moves */}
          <Grid item xs={12} lg={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Moves (First 10)
                </Typography>
                <MovesList moves={pokemon.moves.slice(0, 10)} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Chip,
  Stack,
  Typography,
  Avatar,
  IconButton,
  TablePagination,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useGetPokemonDetailQuery } from '../services/pokeApi';
import ShinyModal from './ShinyModal';
import {
  capitalizeName,
  formatPokedexNumber,
  getTypeColor,
  getBestSpriteUrl,
} from '../../../utils/formatters';


interface PokemonRowProps {
    name: string;
    url: string;
}

function PokemonRow({ name, url }: PokemonRowProps) {
  const navigate = useNavigate();
  const [showShinyModal, setShowShinyModal] = useState(false);

  // Extract ID from URL
  const id = url.match(/\/pokemon\/(\d+)\//)?.[1] || '0';

  // Fetch pokemon details
  const { data: pokemon, isLoading, isError } = useGetPokemonDetailQuery(id);

  const handleRowClick = () => {
    navigate(`/pokemon/${id}`);
  };

  const handleShinyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShinyModal(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <Typography variant="body2" color="text.secondary">
            Loading {name}...
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  // Error state
  if (isError || !pokemon) {
    return (
      <TableRow>
        <TableCell colSpan={6}>
          <Typography color="error">Failed to load {name}</Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableRow
        hover
        onClick={handleRowClick}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {/* Number */}
        <TableCell>
          <Typography variant="body2" fontWeight="bold">
            {formatPokedexNumber(pokemon.id)}
          </Typography>
        </TableCell>

        {/* Name */}
        <TableCell>
          <Typography variant="body1" fontWeight="medium">
            {capitalizeName(pokemon.name)}
          </Typography>
        </TableCell>

        {/* Image */}
        <TableCell>
          <Avatar
            src={getBestSpriteUrl(pokemon.sprites)}
            alt={pokemon.name}
            sx={{
              width: 64,
              height: 64,
              backgroundColor: 'grey.100',
            }}
            variant="rounded"
          />
        </TableCell>

        {/* Types */}
        <TableCell>
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
        </TableCell>

        {/* Abilities */}
        <TableCell>
          <Typography variant="body2">
            {pokemon.abilities
              .slice(0, 3)
              .map((a) => capitalizeName(a.ability.name))
              .join(', ')}
          </Typography>
        </TableCell>

        {/* Shiny Button */}
        <TableCell>
          <Button
            size="small"
            variant="outlined"
            onClick={handleShinyClick}
          >
            ✨ Shiny
          </Button>
        </TableCell>
      </TableRow>

      {/* Shiny Modal */}
      <ShinyModal
        open={showShinyModal}
        onClose={() => setShowShinyModal(false)}
        pokemonName={pokemon.name}
        sprites={pokemon.sprites}
      />
    </>
  );
}

interface PokemonListProps {
    pokemonList: Array<{ name: string; url: string }>;
    currentPage: number;
    totalCount: number;
    itemsPerPage: number;
    onPageChange: (newPage: number) => void;
}

export default function PokemonList({
  pokemonList,
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
}: PokemonListProps) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const handlePreviousPage = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <Paper elevation={2}>
      {/* Table */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="pokemon table">
          {/* Table Header */}
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Number
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Name
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Image
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Types
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Abilities
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {pokemonList.map((pokemon) => (
              <PokemonRow
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {/* Previous Button */}
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          onClick={handlePreviousPage}
          disabled={!canGoPrevious}
        >
          Previous
        </Button>

        {/* Page Info */}
        <Typography variant="body2" color="text.secondary">
          Page {currentPage + 1} of {totalPages}
        </Typography>

        {/* Next Button */}
        <Button
          variant="outlined"
          endIcon={<NavigateNextIcon />}
          onClick={handleNextPage}
          disabled={!canGoNext}
        >
          Next
        </Button>
      </Box>

      {/* Alternative: MUI TablePagination (more features) */}
      <TablePagination
        component="div"
        count={totalCount}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[20]} // Fixed 20 per page
        sx={{ borderTop: 1, borderColor: 'divider' }}
      />
    </Paper>
  );
}
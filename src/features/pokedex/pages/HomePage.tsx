import { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Box,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Button,
  Stack,
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logout, selectUsername } from '../../auth/authSlice';
import { setViewMode, setSearchQuery, selectViewMode, selectSearchQuery } from '../pokedexSlice';
import { useGetPokemonListQuery } from '../services/pokeApi';
import PokemonList from '../components/PokemonList';
import PokemonGrid from '../components/PokemonGrid';
import ThemeToggle from '../../../components/ui/ThemeToggle';
import LanguageToggle from '../../../components/ui/LanguageToggle';
import { useLanguage } from '../../../contexts/LanguageContext';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Redux state
  const viewMode = useAppSelector(selectViewMode);
  const searchQuery = useAppSelector(selectSearchQuery);
  const username = useAppSelector(selectUsername);

  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [allLoadedPokemon, setAllLoadedPokemon] = useState<any[]>([]);
  const itemsPerPage = 20;

  // Fetch pokemon list
  const { data, isLoading, isError } = useGetPokemonListQuery({
    offset: currentPage * itemsPerPage,
    limit: itemsPerPage,
  });

  // For infinite scroll: accumulate loaded pokemon
  useEffect(() => {
    if (data && viewMode === 'grid') {
      setAllLoadedPokemon((prev) => {
        const newPokemon = data.results.filter(
          (p) => !prev.some((existing) => existing.name === p.name)
        );
        return [...prev, ...newPokemon];
      });
    }
  }, [data, viewMode]);

  // Reset accumulated pokemon when switching to list mode
  useEffect(() => {
    if (viewMode === 'list') {
      setAllLoadedPokemon([]);
      setCurrentPage(0);
    }
  }, [viewMode]);

  // Filter pokemon by search query
  const filteredPokemon = useMemo(() => {
    const pokemonToFilter = viewMode === 'grid' ? allLoadedPokemon : data?.results || [];
    
    if (!searchQuery.trim()) {
      return pokemonToFilter;
    }
    
    return pokemonToFilter.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data, allLoadedPokemon, viewMode]);

  // Handlers
  const handleViewModeChange = (_event: React.MouseEvent<HTMLElement>, newMode: 'list' | 'grid' | null) => {
    if (newMode) {
      dispatch(setViewMode(newMode));
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLoadMore = () => {
    if (data?.next) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {/* AppBar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokédex
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {t('welcome')}, {username}!
          </Typography>
          <Stack direction="row" spacing={1}>
            <LanguageToggle />
            <ThemeToggle />
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
              {t('logout')}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Search and View Toggle */}
        <Paper elevation={2} sx={{ padding: 3, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              alignItems: { xs: 'stretch', md: 'center' },
              justifyContent: 'space-between',
            }}
          >
            {/* Search Field */}
            <TextField
              placeholder={t('searchPlaceholder')}
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ flexGrow: 1 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />

            {/* View Mode Toggle */}
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="view mode"
            >
              <ToggleButton value="list" aria-label="list view">
                <ViewListIcon sx={{ mr: 1 }} />
                {t('list')}
              </ToggleButton>
              <ToggleButton value="grid" aria-label="grid view">
                <ViewModuleIcon sx={{ mr: 1 }} />
                {t('grid')}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Paper>

        {/* Loading State */}
        {isLoading && currentPage === 0 && (
          <Box textAlign="center" py={8}>
            <Typography>Loading Pokémon...</Typography>
          </Box>
        )}

        {/* Error State */}
        {isError && (
          <Box textAlign="center" py={8}>
            <Typography color="error">
              Failed to load Pokémon. Please try again.
            </Typography>
          </Box>
        )}

        {/* List View */}
        {viewMode === 'list' && data && !isLoading && (
          <PokemonList
            pokemonList={filteredPokemon}
            currentPage={currentPage}
            totalCount={data.count}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <PokemonGrid
            pokemonList={filteredPokemon}
            hasMore={!!data?.next}
            isLoading={isLoading}
            onLoadMore={handleLoadMore}
          />
        )}
      </Container>
    </>
  );
}
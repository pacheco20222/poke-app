import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    Typography,
    Grid,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import type { PokemonSprites } from '../../../types/pokemon';
import { capitalizeName } from "../../../utils/formatters";

interface ShinyModalProps {
    open: boolean;
    onClose: () => void;
    pokemonName: string;
    sprites: PokemonSprites
}

export default function ShinyModal({
  open,
  onClose,
  pokemonName,
  sprites,
}: ShinyModalProps) {
  
  // Get sprite URLs (with fallbacks)
  const normalFront = sprites?.front_default || '';
  const shinyFront = sprites?.front_shiny || '';
  const normalArtwork = sprites?.other?.['official-artwork']?.front_default || '';
  const shinyArtwork = sprites?.other?.['official-artwork']?.front_shiny || '';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="shiny-modal-title"
    >
      {/* Modal Header */}
      <DialogTitle id="shiny-modal-title">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {capitalizeName(pokemonName)} - Shiny Variants
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Modal Content */}
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Normal Sprites */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box textAlign="center">
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Normal
              </Typography>
              
              {/* Official Artwork */}
              {normalArtwork && (
                <Box mb={2}>
                  <img
                    src={normalArtwork}
                    alt={`${pokemonName} normal artwork`}
                    style={{
                      width: '100%',
                      maxWidth: 200,
                      height: 'auto',
                      imageRendering: 'pixelated',
                    }}
                  />
                </Box>
              )}
              
              {/* Sprite */}
              {normalFront && (
                <Box>
                  <img
                    src={normalFront}
                    alt={`${pokemonName} normal sprite`}
                    style={{
                      width: 96,
                      height: 96,
                      imageRendering: 'pixelated',
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>

          {/* Shiny Sprites */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box textAlign="center">
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="secondary">
                Shiny
              </Typography>
              
              {/* Official Artwork */}
              {shinyArtwork && (
                <Box mb={2}>
                  <img
                    src={shinyArtwork}
                    alt={`${pokemonName} shiny artwork`}
                    style={{
                      width: '100%',
                      maxWidth: 200,
                      height: 'auto',
                      imageRendering: 'pixelated',
                    }}
                  />
                </Box>
              )}
              
              {/* Sprite */}
              {shinyFront && (
                <Box>
                  <img
                    src={shinyFront}
                    alt={`${pokemonName} shiny sprite`}
                    style={{
                      width: 96,
                      height: 96,
                      imageRendering: 'pixelated',
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
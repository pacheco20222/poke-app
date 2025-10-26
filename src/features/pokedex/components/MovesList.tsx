import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Skeleton,
  Box,
} from '@mui/material';
import { useGetMoveDetailQuery } from '../services/pokeApi';
import {
  capitalizeName,
  formatMovePower,
  formatMoveAccuracy,
  getTypeColor,
} from '../../../utils/formatters';
import type { PokemonMoveReference } from '../../../types/pokemon';

interface MoveRowProps {
  moveName: string;
}

function MoveRow({ moveName }: MoveRowProps) {
  const { data, isLoading, isError } = useGetMoveDetailQuery(moveName);

  if (isLoading) {
    return (
      <TableRow>
        <TableCell><Skeleton width="80%" /></TableCell>
        <TableCell><Skeleton width="40px" /></TableCell>
        <TableCell><Skeleton width="40px" /></TableCell>
        <TableCell><Skeleton width="60px" /></TableCell>
      </TableRow>
    );
  }

  // Error state
  if (isError || !data) {
    return (
      <TableRow>
        <TableCell>{capitalizeName(moveName)}</TableCell>
        <TableCell>N/D</TableCell>
        <TableCell>N/D</TableCell>
        <TableCell>N/D</TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow hover>
      {/* Move Name */}
      <TableCell>
        <Typography variant="body2" fontWeight="medium">
          {capitalizeName(data.name)}
        </Typography>
      </TableCell>

      {/* Power */}
      <TableCell align="center">
        <Typography variant="body2">
          {formatMovePower(data.power)}
        </Typography>
      </TableCell>

      {/* Accuracy */}
      <TableCell align="center">
        <Typography variant="body2">
          {formatMoveAccuracy(data.accuracy)}
        </Typography>
      </TableCell>

      {/* Type */}
      <TableCell>
        <Chip
          label={capitalizeName(data.type.name)}
          size="small"
          sx={{
            backgroundColor: getTypeColor(data.type.name),
            color: 'white',
            fontWeight: 'bold',
          }}
        />
      </TableCell>
    </TableRow>
  );
}

interface MovesListProps {
  moves: PokemonMoveReference[];
}


export default function MovesList({ moves }: MovesListProps) {
  if (moves.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">
          No moves available
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        {/* Table Header */}
        <TableHead>
          <TableRow sx={{ backgroundColor: 'grey.100' }}>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Name
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight="bold">
                Power
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight="bold">
                Accuracy
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Type
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {moves.map((moveRef) => (
            <MoveRow key={moveRef.move.name} moveName={moveRef.move.name} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
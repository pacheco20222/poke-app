import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Box,
  Skeleton,
} from '@mui/material';
import { useGetAbilityDetailQuery } from '../services/pokeApi';
import { capitalizeName } from '../../../utils/formatters';
import type { PokemonAbility } from '../../../types/pokemon';


interface AbilityItemProps {
  abilityName: string;
  isHidden: boolean;
}


function AbilityItem({ abilityName, isHidden }: AbilityItemProps) {
  const { data, isLoading, isError } = useGetAbilityDetailQuery(abilityName);


  const description = data?.effect_entries?.find(
    (entry) => entry.language.name === 'en'
  )?.short_effect || data?.effect_entries?.find(
    (entry) => entry.language.name === 'en'
  )?.effect || 'No description available.';


  if (isLoading) {
    return (
      <ListItem>
        <ListItemText
          primary={<Skeleton width="40%" />}
          secondary={<Skeleton width="80%" />}
        />
      </ListItem>
    );
  }

  // Error state
  if (isError) {
    return (
      <ListItem>
        <ListItemText
          primary={capitalizeName(abilityName)}
          secondary="Failed to load description"
        />
      </ListItem>
    );
  }

  return (
    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
      <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {capitalizeName(abilityName)}
            </Typography>
            {isHidden && (
              <Chip
                label="Hidden"
                size="small"
                color="secondary"
                sx={{ height: 20 }}
              />
            )}
          </Box>
        }
        secondary={
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        }
      />
    </ListItem>
  );
}

interface AbilitiesListProps {
  abilities: PokemonAbility[];
}


export default function AbilitiesList({ abilities }: AbilitiesListProps) {
  const sortedAbilities = [...abilities].sort((a, b) => {
    if (a.is_hidden === b.is_hidden) return 0;
    return a.is_hidden ? 1 : -1;
  });

  return (
    <List>
      {sortedAbilities.map((abilityInfo) => (
        <AbilityItem
          key={abilityInfo.ability.name}
          abilityName={abilityInfo.ability.name}
          isHidden={abilityInfo.is_hidden}
        />
      ))}
    </List>
  );
}
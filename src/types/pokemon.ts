export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface PokemonMoveReference {
    move: {
        name: string;
        url: string;
    };
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  // High-quality official artwork
  other?: {
    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
    // Dream World artwork (alternative style)
    dream_world?: {
      front_default: string | null;
    };
    // Home artwork (latest style)
    home?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonDetail {
  id: number; // Pokemon number (Bulbasaur = 1, Pikachu = 25)
  name: string; // "pikachu"
  sprites: PokemonSprites;
  types: PokemonType[];
  abilities: PokemonAbility[];
  moves: PokemonMoveReference[];
  stats: PokemonStat[]; // Array of 6 stats
  height: number; // Height in decimeters (10 = 1 meter)
  weight: number; // Weight in hectograms (10 = 1 kilogram)
}

export interface FlavorTextEntry {
    flavor_text: string;
    langauge: {
        name: string;
        url: string;
    };
    version: {
        name: string;
        url: string;
    };
}

export interface PokemonSpecies {
    id: number;
    name: string;
    flavor_text_entries: FlavorTextEntry[];
    genera?: Array<{
        genus: string;
        language: {
            name: string;
        };
    }>;
    generation?: {
        name: string;
        url: string;
    };
}


export interface AbilityEffectEntry {
    effect: string;
    short_effect: string;
    language: {
        name: string;
        url: string;
    };
}

export interface AbilityDetail {
  id: number;
  name: string; // "blaze", "overgrow"
  effect_entries: AbilityEffectEntry[];
  // Flavor text (pokedex-style short descriptions)
  flavor_text_entries?: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

export interface PokemonMove {
  id: number;
  name: string; // "thunderbolt", "quick-attack"
  power: number | null; // null for status moves (e.g., "growl")
  accuracy: number | null; // null for moves that never miss
  pp: number; // Power Points (how many times it can be used)
  type: {
    name: string; // "electric", "normal"
    url: string;
  };
  damage_class: {
    name: string; // "physical", "special", "status"
    url: string;
  };
  // Additional useful fields
  effect_entries?: Array<{
    effect: string;
    short_effect: string;
    language: {
      name: string;
    };
  }>;
}

export type ViewMode = 'list' | 'grid';

export interface EnrichedPokemon {
    id: number;
    name: string;
    url: string;
    sprite: PokemonSprites;
    types: PokemonType[];
    abilities: PokemonAbility[];
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface SimpleAbility {
    name: string;
    description: string;
}

export interface SimpleMove {
    name: string;
    power: number | null;
    accuracy: number | null;
    typeName: string;
}
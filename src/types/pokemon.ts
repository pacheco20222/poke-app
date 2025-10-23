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

export interface PokemonSprites {
    front_default: string | null;
    front_shiny: string | null;
    back_default: string | null;
    back_shiny: string | null;
    other?: {
        "official-artwork": {
            front_default: string | null;
            front_shiny: string | null;
        };
    };
}

export interface PokemonDetail {
    id: number;
    name: string;
    sprites: PokemonSprites;
    types: PokemonType[];
    abilities: PokemonAbility[];
    moves: Array<{
        move: {
            name: string;
            url: string;
        };
    }>;
    height: number;
    weight: number;
}

export interface PokemonSpecies {
    flavor_text_entries: Array<{
        flavor_text: string;
        language:{
            name: string;
        };
    }>;
}

export interface PokemonMove {
    name: string;
    power: number | null;
    accuracy: number | null;
    type: {
        name: string;
    };
}

export interface AbilityDetail {
    name: string;
    effect_entries: Array<{
        effect: string;
        language: {
            name: string;
        };
    }>;
}
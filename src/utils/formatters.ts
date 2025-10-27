export const capitalizeName = (name: string): string => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
};

export const formatPokedexNumber = (id: number): string => {
    return `#${id.toString().padStart(3, '0')}`;
};

export const extractIdFromUrl = (url: string): number | null => {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? parseInt(match[1], 10) : null;
};

export const formatMovePower = (power: number | null): string => {
    return power !== null ? power.toString() : 'N/D';
};

export const formatMoveAccuracy = (accuracy: number | null): string => {
    return accuracy !== null ? `${accuracy}%` : '-';
};

export const getTypeColor = (type: string): string => {
    const typeColors: Record<string, string> = {
        normal: '#b3b281ff',
        fire: '#f37b25ff',
        water: '#4a79e7ff',
        electric: '#f3c921ff',
        grass: '#6bc73dff',
        ice: '#97e4e4ff',
        fighting: '#c0251dff',
        poison: '#9e349eff',
        ground: '#c9ab57ff',
        flying: '#937bddff',
        psychic: '#e04674ff',
        bug: '#9aa817ff',
        rock: '#c7ad3bff',
        ghost: '#5b467cff',
        dragon: '#6a2cf8ff',
        dark: '#695548ff',
        steel: '#9f9fb3ff',
        fairy: '#eb8ba0ff',
    };
    return typeColors[type.toLowerCase()] || '#464646ff';
};

export const getBestSpriteUrl = (sprites: any): string => {
    return (
        sprites?.other?.['official-artwork']?.front_default ||
        sprites?.front_default ||
        '/placeholder.png'
    );
};

export const getDescription = (entries: any[], language: 'en' | 'es'): string => {
    if (!entries || entries.length === 0) {
        return language === 'es' ? 'Descripción no disponible.' : 'Description not available.';
    }

    const langEntry = entries.find((entry) => entry.language.name === language);
    if (langEntry) return langEntry.flavor_text.replace(/\f/g, ' ');

    // Fallback to English if requested language not found
    const fallback = entries.find((entry) => entry.language.name === 'en');
    return fallback ? fallback.flavor_text.replace(/\f/g, ' ') : 
        (language === 'es' ? 'Descripción no disponible.' : 'Description not available.');
};

// Legacy function for backward compatibility
export const getSpanishDescription = (entries: any[]): string => {
    return getDescription(entries, 'es');
};


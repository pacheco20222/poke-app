import { describe, it, expect } from 'vitest';
import {
  capitalizeName,
  formatPokedexNumber,
  extractIdFromUrl,
  formatMovePower,
  formatMoveAccuracy,
  getTypeColor,
} from '../formatters';

describe('formatters', () => {
  describe('capitalizeName', () => {
    it('capitalizes first letter', () => {
      expect(capitalizeName('pikachu')).toBe('Pikachu');
      expect(capitalizeName('bulbasaur')).toBe('Bulbasaur');
    });

    it('handles empty string', () => {
      expect(capitalizeName('')).toBe('');
    });

    it('handles already capitalized names', () => {
      expect(capitalizeName('Charizard')).toBe('Charizard');
    });
  });

  describe('formatPokedexNumber', () => {
    it('formats single digit with leading zeros', () => {
      expect(formatPokedexNumber(1)).toBe('#001');
      expect(formatPokedexNumber(5)).toBe('#005');
    });

    it('formats double digit with one leading zero', () => {
      expect(formatPokedexNumber(25)).toBe('#025');
      expect(formatPokedexNumber(99)).toBe('#099');
    });

    it('formats triple digit without leading zeros', () => {
      expect(formatPokedexNumber(150)).toBe('#150');
      expect(formatPokedexNumber(999)).toBe('#999');
    });
  });

  describe('extractIdFromUrl', () => {
    it('extracts ID from pokemon URL', () => {
      expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25);
      expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/150/')).toBe(150);
    });

    it('returns null for invalid URL', () => {
      expect(extractIdFromUrl('invalid-url')).toBe(null);
      expect(extractIdFromUrl('')).toBe(null);
    });
  });

  describe('formatMovePower', () => {
    it('formats number as string', () => {
      expect(formatMovePower(90)).toBe('90');
      expect(formatMovePower(120)).toBe('120');
    });

    it('returns N/D for null', () => {
      expect(formatMovePower(null)).toBe('N/D');
    });
  });

  describe('formatMoveAccuracy', () => {
    it('formats number with percentage', () => {
      expect(formatMoveAccuracy(100)).toBe('100%');
      expect(formatMoveAccuracy(85)).toBe('85%');
    });

    it('returns hyphen for null', () => {
      expect(formatMoveAccuracy(null)).toBe('-');
    });
  });

  describe('getTypeColor', () => {
    it('returns correct color for known types', () => {
      expect(getTypeColor('fire')).toBe('#f37b25ff');
      expect(getTypeColor('water')).toBe('#4a79e7ff');
      expect(getTypeColor('grass')).toBe('#6bc73dff');
    });

    it('returns default color for unknown type', () => {
      expect(getTypeColor('unknown')).toBe('#464646ff');
    });

    it('handles case insensitivity', () => {
      expect(getTypeColor('FIRE')).toBe('#f37b25ff');
      expect(getTypeColor('Water')).toBe('#4a79e7ff');
    });
  });
});
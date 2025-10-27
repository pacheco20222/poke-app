import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../test/test-utils';
import ShinyModal from '../ShinyModal';
import type { PokemonSprites } from '../../../../types/pokemon';

const mockSprites: PokemonSprites = {
  front_default: 'https://example.com/front.png',
  front_shiny: 'https://example.com/front-shiny.png',
  back_default: 'https://example.com/back.png',
  back_shiny: 'https://example.com/back-shiny.png',
  other: {
    'official-artwork': {
      front_default: 'https://example.com/artwork.png',
      front_shiny: 'https://example.com/artwork-shiny.png',
    },
  },
};

describe('ShinyModal', () => {
  it('does not render when closed', () => {
    const mockOnClose = vi.fn();
    renderWithProviders(
      <ShinyModal
        open={false}
        onClose={mockOnClose}
        pokemonName="pikachu"
        sprites={mockSprites}
      />
    );
    
    expect(screen.queryByText(/pikachu - shiny variants/i)).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    const mockOnClose = vi.fn();
    renderWithProviders(
      <ShinyModal
        open={true}
        onClose={mockOnClose}
        pokemonName="pikachu"
        sprites={mockSprites}
      />
    );
    
    expect(screen.getByText(/pikachu - shiny variants/i)).toBeInTheDocument();
    expect(screen.getByText(/^normal$/i)).toBeInTheDocument();
    // Note: "Shiny" appears twice (title and column header), so use getAllByText
    expect(screen.getAllByText(/shiny/i).length).toBeGreaterThan(0);
  });

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();
    
    renderWithProviders(
      <ShinyModal
        open={true}
        onClose={mockOnClose}
        pokemonName="pikachu"
        sprites={mockSprites}
      />
    );
    
    const closeButton = screen.getByLabelText(/close/i);
    await user.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('displays sprite images', () => {
    const mockOnClose = vi.fn();
    renderWithProviders(
      <ShinyModal
        open={true}
        onClose={mockOnClose}
        pokemonName="pikachu"
        sprites={mockSprites}
      />
    );
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });
});
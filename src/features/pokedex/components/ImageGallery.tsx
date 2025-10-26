import { useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import type { PokemonSprites } from '../../../types/pokemon';


interface ImageGalleryProps {
  pokemonName: string;
  sprites: PokemonSprites;
}


export default function ImageGallery({
  pokemonName,
  sprites,
}: ImageGalleryProps) {
  const spriteList = [
    {
      url: sprites?.other?.['official-artwork']?.front_default,
      label: 'Official Art',
    },
    {
      url: sprites?.other?.['official-artwork']?.front_shiny,
      label: 'Official Art (Shiny)',
    },
    {
      url: sprites?.front_default,
      label: 'Front',
    },
    {
      url: sprites?.front_shiny,
      label: 'Front (Shiny)',
    },
    {
      url: sprites?.back_default,
      label: 'Back',
    },
    {
      url: sprites?.back_shiny,
      label: 'Back (Shiny)',
    },
    {
      url: sprites?.other?.home?.front_default,
      label: 'Home',
    },
    {
      url: sprites?.other?.home?.front_shiny,
      label: 'Home (Shiny)',
    },
  ].filter((sprite) => sprite.url); // Remove null sprites

  const [selectedImage, setSelectedImage] = useState(
    spriteList[0]?.url || ''
  );
  const [selectedLabel, setSelectedLabel] = useState(
    spriteList[0]?.label || ''
  );

  const handleImageClick = (url: string, label: string) => {
    setSelectedImage(url);
    setSelectedLabel(label);
  };

  return (
    <Card elevation={3}>
      {/* Main Large Image */}
      <Box
        sx={{
          backgroundColor: 'grey.100',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
        }}
      >
        <CardMedia
          component="img"
          image={selectedImage}
          alt={`${pokemonName} ${selectedLabel}`}
          sx={{
            width: '100%',
            maxWidth: 300,
            height: 'auto',
            objectFit: 'contain',
            imageRendering: 'pixelated',
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          {selectedLabel}
        </Typography>
      </Box>

      {/* Thumbnail Grid */}
      <Box sx={{ padding: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          All Sprites
        </Typography>
        <ImageList cols={4} gap={8}>
          {spriteList.map((sprite, index) => (
            <ImageListItem
              key={index}
              sx={{
                cursor: 'pointer',
                border: 2,
                borderColor:
                  selectedImage === sprite.url
                    ? 'primary.main'
                    : 'transparent',
                borderRadius: 1,
                transition: 'border-color 0.2s',
                '&:hover': {
                  borderColor: 'primary.light',
                },
              }}
              onClick={() => handleImageClick(sprite.url!, sprite.label)}
            >
              <img
                src={sprite.url!}
                alt={sprite.label}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  imageRendering: 'pixelated',
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Card>
  );
}
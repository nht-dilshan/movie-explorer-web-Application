// src/components/MovieFilters.jsx
import React from "react";
import { Box, Chip } from "@mui/material";

const MovieFilters = ({ genreList = [], activeGenre, onGenreClick }) => {
  if (!genreList || genreList.length === 0) {
    return null;
  }
  
  return (
    <Box sx={{ 
      mb: 3, 
      overflowX: 'auto', 
      pb: 1,
      '&::-webkit-scrollbar': {
        height: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '4px',
      }
    }}>
      <Box sx={{ 
        display: 'flex', 
        gap: 1,
        minWidth: { xs: 'max-content', md: '100%' }
      }}>
        {genreList.slice(0, 10).map((genre) => (
          <Chip
            key={genre.id || index}
            label={genre.name || "Genre"}
            clickable
            color={activeGenre === genre.id ? "primary" : "default"}
            onClick={() => onGenreClick && onGenreClick(genre.id)}
            sx={{ mb: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MovieFilters;

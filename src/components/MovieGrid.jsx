// src/components/MovieGrid.jsx
import React from "react";
import { Grid, Fade, Alert, Box } from "@mui/material";
import MovieCard from "./MovieCard";
import MovieSkeleton from "./MovieSkeleton";

const MovieGrid = ({ 
  loading, 
  loadingMore, 
  displayedMovies = [], // Provide default empty array
  isInFavorites, 
  isInWatchlist, 
  onFavoriteClick, 
  onWatchlistClick 
}) => {
  if (loading && !loadingMore) {
    return (
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <MovieSkeleton count={8} />
        </Grid>
      </Box>
    );
  }

  if (!displayedMovies || displayedMovies.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 4 }}>
        No movies found. Try adjusting your search or filters.
      </Alert>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {displayedMovies.map((movie, index) => (
        movie ? (
          <Fade in={true} timeout={300 + index * 50} key={movie.id || index}>
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center' 
              }}
            >
              <MovieCard 
                movie={movie}
                isInFavorites={isInFavorites}
                isInWatchlist={isInWatchlist}
                onFavoriteClick={onFavoriteClick}
                onWatchlistClick={onWatchlistClick}
              />
            </Grid>
          </Fade>
        ) : null
      ))}
    </Grid>
  );
};

export default MovieGrid;

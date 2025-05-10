// src/components/MovieCard.jsx
import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton, Tooltip, Chip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, isInFavorites, isInWatchlist, onFavoriteClick, onWatchlistClick }) => {
  const navigate = useNavigate();
  
  // Guard clause to prevent errors with undefined movie
  if (!movie) {
    return null;
  }

  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '220px' },
        height: { xs: 'auto', sm: '420px' }, // Increased overall card height
        minHeight: { xs: '420px', sm: '420px' }, // Increased minimum height
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
        },
        position: "relative",
        overflow: "hidden" 
      }}
    >
      {/* Favorite and Watchlist buttons */}
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
        <Tooltip title={isInFavorites && isInFavorites(movie.id) ? "Remove from favorites" : "Add to favorites"}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (onFavoriteClick) onFavoriteClick(movie);
            }}
            sx={{ 
              bgcolor: "rgba(0,0,0,0.5)", 
              color: "white",
              mr: 1,
              padding: { xs: '8px', sm: '4px' },
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } 
            }}
          >
            {isInFavorites && isInFavorites(movie.id) ? 
              <FavoriteIcon color="error" fontSize="small" /> : 
              <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        
        <Tooltip title={isInWatchlist && isInWatchlist(movie.id) ? "Remove from watchlist" : "Add to watchlist"}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (onWatchlistClick) onWatchlistClick(movie);
            }}
            sx={{ 
              bgcolor: "rgba(0,0,0,0.5)", 
              color: "white",
              padding: { xs: '8px', sm: '4px' },
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } 
            }}
          >
            {isInWatchlist && isInWatchlist(movie.id) ? 
              <BookmarkIcon color="primary" fontSize="small" /> : 
              <BookmarkBorderIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Movie Poster - Increased height */}
      <Box sx={{ 
        height: { xs: '280px', sm: '300px' }, // Significantly increased poster height
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px 8px 0 0',
      }}>
        <CardMedia
          component="img"
          sx={{ 
            width: '100%',
            height: '100%',
            objectFit: "cover",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)"
            }
          }}
          image={
            movie.poster_path 
              ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` // Using even higher quality image
              : "https://via.placeholder.com/780x1170?text=No+Image"
          }
          alt={movie.title || "Movie poster"}
          loading="lazy"
        />
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none'
        }} />
      </Box>
      
      <CardContent sx={{ 
        flexGrow: 1, 
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: { xs: 1.5, sm: 2 },
        pb: { xs: 1.5, sm: 2 }, // Ensure padding at the bottom
      }}>
        <Box>
          <Typography variant="h6" gutterBottom noWrap title={movie.title} sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {movie.title || "Untitled"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            {movie.release_date && (
              <Typography variant="body2" color="text.secondary">
                {new Date(movie.release_date).getFullYear()}
              </Typography>
            )}
            {movie.vote_average > 0 && (
              <Chip
                label={movie.vote_average.toFixed(1)}
                size="small"
                sx={{
                  bgcolor: movie.vote_average >= 7 ? "success.main" : 
                          movie.vote_average >= 5 ? "warning.main" : "error.main",
                  color: "white",
                  fontWeight: "bold"
                }}
              />
            )}
          </Box>
        </Box>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mt: 'auto' }}
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default MovieCard;

import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  // Always load latest watchlist from localStorage when page is shown
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const removeFromWatchlist = (id) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Watchlist
      </Typography>
      {watchlist.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Your watchlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {watchlist.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card sx={{ width: "220px", height: "350px", borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ height: "60%", objectFit: "cover" }}
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom noWrap>
                    {movie.title}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/movie/${movie.id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => removeFromWatchlist(movie.id)}
                  >
                    Remove from Watchlist
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Watchlist;
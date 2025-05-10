import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CardMedia,
  CircularProgress,
  Grid,
  Chip,
  Button,
  Paper,
  Divider,
  IconButton,
  Rating,
  Tooltip,
  Fade,
  useTheme,
  Container,
  Stack,
  Avatar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const fetchMovieDetails = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=videos,credits`
      );
      setMovie(res.data);

      // Check if the movie is already in favorites and watchlist
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

      setIsFavorite(favorites.some((fav) => fav.id === res.data.id));
      setIsInWatchlist(watchlist.some((item) => item.id === res.data.id));
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!isFavorite) {
      localStorage.setItem("favorites", JSON.stringify([...favorites, movie]));
    } else {
      const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    setIsFavorite(!isFavorite);
  };

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!isInWatchlist) {
      localStorage.setItem("watchlist", JSON.stringify([...watchlist, movie]));
    } else {
      const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }

    setIsInWatchlist(!isInWatchlist);
  };

  useEffect(() => {
    fetchMovieDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          flexDirection: "column",
          gap: 2
        }}
      >
        <CircularProgress color="primary" size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Loading movie details...
        </Typography>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          textAlign: "center",
          backgroundColor: theme.palette.background.paper,
          maxWidth: 600,
          mx: "auto"
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          Failed to load movie details
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Unable to retrieve information for this movie. Please try again later.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
        >
          Go Back
        </Button>
      </Paper>
    );
  }

  const trailer = movie.videos.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  const directors = movie.credits?.crew?.filter(person => person.job === "Director") || [];
  const cast = movie.credits?.cast?.slice(0, 5) || [];

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: movie.backdrop_path ?
          `linear-gradient(to bottom, rgba(18, 18, 18, 0.8), rgba(18, 18, 18, 1)), 
           url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` :
          'none',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        pt: 4,
        pb: 8
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 4,
            color: "white",
            borderColor: "rgba(255, 255, 255, 0.3)",
            '&:hover': {
              borderColor: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }
          }}
        >
          Back to Movies
        </Button>

        <Grid container spacing={4}>
          {/* Movie Poster */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                height: "100%",
                maxHeight: 600,
              }}
            >
              <CardMedia
                component="img"
                image={movie.poster_path ?
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                  "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {trailer && (
                <Tooltip title="Play Trailer">
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "rgba(0,0,0,0.7)",
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        transform: "translate(-50%, -50%) scale(1.1)",
                      },
                      width: 70,
                      height: 70,
                      transition: "all 0.3s ease"
                    }}
                    onClick={() => setShowTrailer(true)}
                  >
                    <PlayArrowIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Grid>

          {/* Movie Info */}
          <Grid item xs={12} md={8}>
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                gutterBottom
                sx={{
                  color: "white",
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)"
                }}
              >
                {movie.title}
                {movie.release_date && (
                  <Typography
                    component="span"
                    sx={{
                      ml: 1,
                      color: "text.secondary",
                      fontWeight: 400,
                      fontSize: "1rem"
                    }}
                  >
                    ({new Date(movie.release_date).getFullYear()})
                  </Typography>
                )}
              </Typography>

              {/* Rating and Information Row */}
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                sx={{ mb: 3 }}
              >
                {movie.vote_average > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      name="movie-rating"
                      value={movie.vote_average / 2}
                      precision={0.5}
                      readOnly
                      emptyIcon={<StarIcon style={{ opacity: 0.55, color: "gray" }} fontSize="inherit" />}
                    />
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, fontWeight: 600 }}
                    >
                      {movie.vote_average.toFixed(1)}/10
                    </Typography>
                  </Box>
                )}

                {movie.runtime > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTimeIcon fontSize="small" sx={{ color: "text.secondary", mr: 0.5 }} />
                    <Typography variant="body2">{formatRuntime(movie.runtime)}</Typography>
                  </Box>
                )}

                {movie.release_date && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarMonthIcon fontSize="small" sx={{ color: "text.secondary", mr: 0.5 }} />
                    <Typography variant="body2">
                      {new Date(movie.release_date).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}
              </Stack>

              {/* Genres */}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
                {movie.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.1)",
                      color: "white",
                      '&:hover': {
                        bgcolor: "rgba(255,255,255,0.2)"
                      }
                    }}
                  />
                ))}
              </Box>

              {/* Overview */}
              <Typography
                variant="h6"
                sx={{ mb: 1, color: "white", fontWeight: 500 }}
              >
                Overview
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  mb: 3,
                  color: "text.secondary",
                  maxWidth: "95%"
                }}
              >
                {movie.overview || "No overview available."}
              </Typography>

              {/* Directors */}
              {directors.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                    {directors.length > 1 ? 'Directors' : 'Director'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {directors.map(d => d.name).join(', ')}
                  </Typography>
                </Box>
              )}

              {/* Cast */}
              {cast.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" fontWeight={500} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleOutlineIcon sx={{ mr: 1 }} /> Top Cast
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 1, overflowX: 'auto', pb: 1 }}>
                    {cast.map((person) => (
                      <Box
                        key={person.id}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          minWidth: 80
                        }}
                      >
                        <Avatar
                          alt={person.name}
                          src={person.profile_path ?
                            `https://image.tmdb.org/t/p/w200${person.profile_path}` :
                            '/broken-image.jpg'
                          }
                          sx={{ width: 60, height: 60, mb: 1 }}
                        />
                        <Typography variant="caption" align="center" noWrap sx={{ width: '100%' }}>
                          {person.name}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color={isFavorite ? "secondary" : "primary"}
                  startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={toggleFavorite}
                  sx={{
                    px: 3,
                    py: 1,
                    boxShadow: 3,
                    background: isFavorite ?
                      theme.palette.secondary.main :
                      `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  }}
                >
                  {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={isInWatchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  onClick={toggleWatchlist}
                  sx={{
                    px: 3,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2
                    }
                  }}
                >
                  {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Trailer Section */}

        {trailer && showTrailer && (
          <Fade in={showTrailer}>
            <Box sx={{ mt: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" fontWeight={600}>
                  Trailer
                </Typography>
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => setShowTrailer(false)}
                >
                  Hide
                </Button>
              </Box>
              <Paper
                sx={{
                  borderRadius: 2,
                  overflow: 'auto', // Enable scrolling if needed
                  bgcolor: 'rgba(0,0,0,0.5)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  maxHeight: '80vh', // Limit max height to viewport
                }}
                elevation={4}
              >
                <Box
                  component="iframe"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                  title="YouTube trailer"
                  width="100%"
                  height="900" // Increase height for a bigger video
                  style={{ minHeight: 500, display: 'block' }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Paper>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default MovieDetails;
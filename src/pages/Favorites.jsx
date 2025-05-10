import React, { useContext, useState } from "react";
import { 
  Box, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Container, 
  Fade, 
  Chip, 
  useTheme, 
  useMediaQuery,
  Snackbar,
  Alert,
  IconButton,
  Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import { MovieContext } from '../context/MovieContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Footer from "../components/Footer";
import MovieIcon from '@mui/icons-material/Movie';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(MovieContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [removedMovie, setRemovedMovie] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleRemove = (movie) => {
    setRemovedMovie(movie.title);
    removeFavorite(movie.id);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ 
        p: { xs: 2, sm: 3, md: 4 },
        pt: { xs: 3, sm: 4 }
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          flexWrap: 'wrap',
          gap: 1
        }}>

          
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1
            }}
          >
            My Favorite Movies
            {favorites.length > 0 && (
              <Chip 
                label={favorites.length} 
                color="primary" 
                size="small" 
                sx={{ ml: 2 }} 
              />
            )}
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {favorites.length === 0 ? (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              py: 8,
              textAlign: 'center'
            }}
          >
            <SentimentDissatisfiedIcon 
              sx={{ 
                fontSize: 80, 
                color: 'text.secondary',
                opacity: 0.7,
                mb: 2
              }} 
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              You have no favorite movies yet.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
              Start exploring movies and click the heart icon to add them to your favorites!
            </Typography>
            <Button 
              component={Link} 
              to="/movies" 
              variant="contained" 
              color="primary" 
              startIcon={<MovieIcon />}
              size="large"
            >
              Explore Movies
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((movie, index) => (
              <Fade in={true} timeout={300 + index * 100} key={movie.id}>
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  lg={3} 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: { xs: 'center', sm: 'flex-start' } 
                  }}
                >
                  <Card
                    sx={{
                      width: { xs: '100%', sm: '220px' },
                      height: { xs: 'auto', sm: '420px' },
                      minHeight: { xs: '420px', sm: '420px' },
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255,255,255,0.05)' 
                        : 'rgba(0,0,0,0.02)',
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6
                      },
                      overflow: 'hidden'
                    }}
                  >
                    <Box sx={{ 
                      height: { xs: '280px', sm: '300px' },
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <CardMedia
                        component="img"
                        sx={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          "&:hover": {
                            transform: "scale(1.05)"
                          }
                        }}
                        image={
                          movie.poster_path 
                            ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
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
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: { xs: 1.5, sm: 2 }
                    }}>
                      <Box>
                        <Typography 
                          variant="h6" 
                          gutterBottom 
                          noWrap 
                          title={movie.title}
                          sx={{ 
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            fontWeight: 'bold'
                          }}
                        >
                          {movie.title}
                        </Typography>
                        
                        {movie.release_date && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {new Date(movie.release_date).getFullYear()}
                            {movie.vote_average > 0 && (
                              <Chip
                                label={`${movie.vote_average.toFixed(1)} ⭐`}
                                size="small"
                                color={
                                  movie.vote_average >= 7 ? "success" : 
                                  movie.vote_average >= 5 ? "warning" : "error"
                                }
                                sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                              />
                            )}
                          </Typography>
                        )}
                      </Box>
                      
                      <Box sx={{ mt: 'auto' }}>
                        <Button
                          component={Link}
                          to={`/movie/${movie.id}`}
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{ 
                            mb: 1,
                            textTransform: 'none',
                            fontWeight: 'bold'
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          fullWidth
                          onClick={() => handleRemove(movie)}
                          sx={{ 
                            textTransform: 'none',
                            borderWidth: '1.5px',
                            '&:hover': {
                              borderWidth: '1.5px',
                              bgcolor: 'rgba(211, 47, 47, 0.04)'
                            }
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Fade>
            ))}
          </Grid>
        )}
      </Box>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          "{removedMovie}" removed from favorites
        </Alert>
      </Snackbar>
      <Footer />
    </Container>
    
  );
};

export default Favorites;

import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
  Fade,
  AppBar,
  Toolbar,
  InputBase,
  Paper,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import Footer from "../components/Footer";
import axios from "axios";
import MovieCard from "../components/MovieCard"; 
import { MovieProvider } from "../context/MovieContext"; 

function FeaturedMovie({ movie, navigate }) {
  return (
    <Paper
      sx={{
        position: "relative",
        height: "500px",
        borderRadius: "16px",
        overflow: "hidden",
        mb: 6,
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%), url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/movie/${movie?.id}`)}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="overline" sx={{ color: "primary.light" }}>
          Featured Movie
        </Typography>
        <Typography variant="h3" component="h2" sx={{ color: "white", mb: 2, fontWeight: 700 }}>
          {movie?.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Typography variant="body1" sx={{ color: "white" }}>
            ⭐ {movie?.vote_average?.toFixed(1)}/10
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ mx: 2, color: "white" }}
          >
            {movie?.release_date ? movie.release_date.slice(0, 4) : "N/A"}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: "white", mb: 3, maxWidth: "600px" }}>
          {movie?.overview?.substring(0, 180)}...
        </Typography>
      </Box>
    </Paper>
  );
}

export default function LandingPage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const popularScrollRef = useRef(null);
  const topRatedScrollRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularRes = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setPopularMovies(popularRes.data.results);
        
        setFeaturedMovie(popularRes.data.results[0]);
        
        const topRatedRes = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setTopRatedMovies(topRatedRes.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleScroll = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      ref.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <MovieProvider>
      <CssBaseline />

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        {featuredMovie && <FeaturedMovie movie={featuredMovie} />}

        <Box sx={{ position: "relative", my: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Popular Movies
          </Typography>

          <Box
            ref={popularScrollRef}
            sx={{
              display: "flex",
              overflowX: "scroll",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              pb: 2,
              minHeight: "420px",
            }}
          >
            {popularMovies.map((movie) => (
              <Box key={movie.id} sx={{ mx: 1 }}>
                <MovieCard movie={movie} />
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => handleScroll("left", popularScrollRef)}
            sx={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              color: "text.primary",
              boxShadow: 3,
              "&:hover": { bgcolor: "background.paper", opacity: 0.9 },
              zIndex: 1,
              width: "40px",
              height: "40px",
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          
          <IconButton
            onClick={() => handleScroll("right", popularScrollRef)}
            sx={{
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              color: "text.primary",
              boxShadow: 3,
              "&:hover": { bgcolor: "background.paper", opacity: 0.9 },
              zIndex: 1,
              width: "40px",
              height: "40px",
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ position: "relative", my: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Top Rated Movies
          </Typography>

          <Box
            ref={topRatedScrollRef}
            sx={{
              display: "flex",
              overflowX: "scroll",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              pb: 2,
              minHeight: "420px",
            }}
          >
            {topRatedMovies.map((movie) => (
              <Box key={movie.id} sx={{ mx: 1 }}>
                <MovieCard movie={movie} />
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => handleScroll("left", topRatedScrollRef)}
            sx={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              color: "text.primary",
              boxShadow: 3,
              "&:hover": { bgcolor: "background.paper", opacity: 0.9 },
              zIndex: 1,
              width: "40px",
              height: "40px",
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          
          <IconButton
            onClick={() => handleScroll("right", topRatedScrollRef)}
            sx={{
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              color: "text.primary",
              boxShadow: 3,
              "&:hover": { bgcolor: "background.paper", opacity: 0.9 },
              zIndex: 1,
              width: "40px",
              height: "40px",
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>

      <Footer />
    </MovieProvider>
  );
}

// src/pages/Movies.jsx
import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Chip, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import SearchAndSort from "../components/SearchAndSort";
import MovieFilters from "../components/MovieFilters";
import MovieGrid from "../components/MovieGrid";
import LoadMoreButton from "../components/LoadMoreButton";
import BackToTopButton from "../components/BackToTopButton";
import Footer from "../components/Footer";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [sortOrder, setSortOrder] = useState("popularity");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);

  const topRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Load favorites and watchlist from localStorage
  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      setFavorites(storedFavorites);
      setWatchlist(storedWatchlist);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      setFavorites([]);
      setWatchlist([]);
    }
  }, []);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setGenreList(res.data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenreList([]);
      }
    };
    fetchGenres();
  }, []);

  // Fetch movies
  const fetchMovies = async () => {
    try {
      setLoadingMore(page > 1);

      let endpoint = "popular";
      if (sortOrder === "top_rated") endpoint = "top_rated";
      else if (sortOrder === "upcoming") endpoint = "upcoming";

      let url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`;
      if (activeGenre) {
        url += `&with_genres=${activeGenre}`;
      }

      const res = await axios.get(url);

      if (page === 1) {
        setMovies(res.data.results || []);
      } else {
        setMovies((prevMovies) => [...(prevMovies || []), ...(res.data.results || [])]);
      }

      setHasMore(page < (res.data.total_pages || 1));
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setLoading(false);
      setLoadingMore(false);
      setHasMore(false);
    }
  };

  // Reset and fetch movies when sort order or genre changes
  useEffect(() => {
    setPage(1);
    setMovies([]);
    setLoading(true);
    fetchMovies();
    // eslint-disable-next-line
  }, [sortOrder, activeGenre]);

  // Fetch more movies when page changes
  useEffect(() => {
    if (page > 1) {
      fetchMovies();
    }
    // eslint-disable-next-line
  }, [page]);

  // Handle search
  const handleSearch = async (query) => {
    setLoading(true);
    if (!query) {
      setSearchResults(null);
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`
      );
      setSearchResults(res.data.results || []);
      setLoading(false);
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchResults([]);
      setLoading(false);
    }
  };

  // Load more movies
  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
    setLoadingMore(true);
  };

  // Handle favorite toggle
  const handleFavorite = (movie) => {
    if (!movie) return;
    
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isAlreadyFavorite = storedFavorites.some((item) => item && item.id === movie.id);

      if (isAlreadyFavorite) {
        const updatedFavorites = storedFavorites.filter((item) => item && item.id !== movie.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        showSnackbar("Removed from favorites");
      } else {
        const updatedFavorites = [...storedFavorites, movie];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        showSnackbar("Added to favorites");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      showSnackbar("Error updating favorites");
    }
  };

  // Handle watchlist toggle
  const handleWatchlist = (movie) => {
    if (!movie) return;
    
    try {
      const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      const isAlreadyInWatchlist = storedWatchlist.some((item) => item && item.id === movie.id);

      if (isAlreadyInWatchlist) {
        const updatedWatchlist = storedWatchlist.filter((item) => item && item.id !== movie.id);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        setWatchlist(updatedWatchlist);
        showSnackbar("Removed from watchlist");
      } else {
        const updatedWatchlist = [...storedWatchlist, movie];
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        setWatchlist(updatedWatchlist);
        showSnackbar("Added to watchlist");
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
      showSnackbar("Error updating watchlist");
    }
  };

  // Sort menu handlers
  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    handleSortClose();
  };

  // Genre filter handler
  const handleGenreFilter = (genreId) => {
    if (activeGenre === genreId) {
      setActiveGenre(null);
    } else {
      setActiveGenre(genreId);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Show snackbar
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  // Check if movie is in favorites
  const isInFavorites = (movieId) => {
    if (!movieId) return false;
    return favorites.some(item => item && item.id === movieId);
  };

  // Check if movie is in watchlist
  const isInWatchlist = (movieId) => {
    if (!movieId) return false;
    return watchlist.some(item => item && item.id === movieId);
  };

  const displayedMovies = searchResults || movies;

  return (
    <Box 
      sx={{ 
        p: { xs: 2, sm: 3, md: 4 },
        maxWidth: '100%',
        overflowX: 'hidden'
      }} 
      ref={topRef}
    >
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Movies
        {searchResults && (
          <Chip 
            label={`Search Results: ${searchResults.length}`} 
            color="primary" 
            size="small" 
            sx={{ ml: 2 }}
            onDelete={() => setSearchResults(null)}
          />
        )}
      </Typography>

      <SearchAndSort 
        onSearch={handleSearch}
        sortOrder={sortOrder}
        onSortClick={handleSortClick}
        anchorEl={anchorEl}
        open={open}
        onSortClose={handleSortClose}
        onSortChange={handleSortChange}
      />
      
      <MovieFilters 
        genreList={genreList}
        activeGenre={activeGenre}
        onGenreClick={handleGenreFilter}
      />

      <MovieGrid 
        loading={loading}
        loadingMore={loadingMore}
        displayedMovies={displayedMovies}
        isInFavorites={isInFavorites}
        isInWatchlist={isInWatchlist}
        onFavoriteClick={handleFavorite}
        onWatchlistClick={handleWatchlist}
      />

      {!searchResults && (
        <LoadMoreButton 
          hasMore={hasMore}
          loading={loadingMore}
          onClick={handleSeeMore}
        />
      )}
      
      <BackToTopButton 
        visible={displayedMovies && displayedMovies.length > 12}
        onClick={scrollToTop}
      />
      
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Footer />
    </Box>
    
  );
};

export default Movies;

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  InputBase,
  IconButton,
  Typography,
  CircularProgress,
  ClickAwayListener,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  useMediaQuery,
  Collapse,
  Button
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import HistoryIcon from "@mui/icons-material/History";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MovieIcon from "@mui/icons-material/Movie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const SearchBar = ({ onSearch, placeholder = "Search for movies..." }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
  const searchInputRef = useRef(null);
  const debounceTimerRef = useRef(null);

 
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setTrendingMovies(res.data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchTrendingMovies();
  }, []);

 
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

  
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.trim()) {
      setLoading(true);
     
      debounceTimerRef.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 500);
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  };

  const fetchSuggestions = async (searchQuery) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchQuery}&page=1`
      );
      setSuggestions(res.data.results.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setLoading(false);
    }
  };

  
  const handleSearch = () => {
    if (query.trim()) {
      
      const updatedHistory = [
        query,
        ...searchHistory.filter(item => item !== query)
      ].slice(0, 5);
      
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      
      
      onSearch(query);
      
      
      setFocused(false);
      setShowResults(false);
    }
  };

 
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    
    
    const updatedHistory = [
      suggestion.title,
      ...searchHistory.filter(item => item !== suggestion.title)
    ].slice(0, 5);
    
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    
  
    onSearch(suggestion.title);
    
    setFocused(false);
    setShowResults(false);
  };

  const handleHistoryClick = (historyItem) => {
    setQuery(historyItem);
    
    const updatedHistory = [
      historyItem,
      ...searchHistory.filter(item => item !== historyItem)
    ];
    
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    
    onSearch(historyItem);
    
    setFocused(false);
    setShowResults(false);
  };

  const handleClearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setLoading(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleClickAway = () => {
    setFocused(false);
    setShowResults(false);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    if (!mobileSearchOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  };

  const shouldShowSuggestions = focused && 
    (suggestions.length > 0 || searchHistory.length > 0 || trendingMovies.length > 0);

  if (isMobile) {
    return (
      <Box sx={{ width: "100%" }}>
        {!mobileSearchOpen ? (
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={toggleMobileSearch}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              color: theme.palette.text.secondary,
              borderRadius: 2,
              p: 1,
              textTransform: 'none',
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              }
            }}
          >
            {placeholder}
          </Button>
        ) : (
          <ClickAwayListener onClickAway={() => {
            handleClickAway();
            if (query.trim() === '') {
              setMobileSearchOpen(false);
            }
          }}>
            <Box sx={{ position: "relative", zIndex: 1200 }}>
              <Paper
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                elevation={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 2,
                  p: "2px 4px",
                  width: "100%",
                  transition: "all 0.3s",
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
                  bgcolor: theme.palette.mode === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                }}
              >
                <IconButton 
                  sx={{ p: '10px' }} 
                  onClick={() => {
                    setMobileSearchOpen(false);
                    setQuery('');
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <InputBase
                  inputRef={searchInputRef}
                  sx={{ 
                    ml: 1, 
                    flex: 1,
                    color: theme.palette.text.primary,
                    "& input::placeholder": {
                      color: theme.palette.text.secondary,
                      opacity: 0.7
                    }
                  }}
                  placeholder={placeholder}
                  value={query}
                  onChange={handleInputChange}
                  onFocus={() => {
                    setFocused(true);
                    setShowResults(true);
                  }}
                  autoComplete="off"
                />
                {loading ? (
                  <CircularProgress size={24} sx={{ mx: 1 }} />
                ) : query ? (
                  <IconButton sx={{ p: '10px' }} onClick={handleClearSearch}>
                    <ClearIcon />
                  </IconButton>
                ) : null}
                <IconButton 
                  type="submit" 
                  sx={{ p: '10px' }} 
                  onClick={handleSearch}
                  disabled={!query.trim()}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>

              <Collapse in={shouldShowSuggestions && showResults}>
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 0.5,
                    maxHeight: "60vh",
                    overflow: "auto",
                    borderRadius: 2,
                    bgcolor: theme.palette.mode === 'dark' ? "#1e1e1e" : "#ffffff",
                    boxShadow: 3,
                    zIndex: 1300,
                  }}
                >
                  {suggestions.length > 0 && (
                    <>
                      <List dense disablePadding>
                        {suggestions.map((suggestion) => (
                          <ListItem
                            key={suggestion.id}
                            button
                            onClick={() => handleSuggestionClick(suggestion)}
                            sx={{
                              py: 1,
                              '&:hover': {
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                              }
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <MovieIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={suggestion.title} 
                              secondary={suggestion.release_date ? new Date(suggestion.release_date).getFullYear() : ''}
                              primaryTypographyProps={{
                                noWrap: true,
                                color: theme.palette.text.primary
                              }}
                              secondaryTypographyProps={{
                                color: theme.palette.text.secondary
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Divider />
                    </>
                  )}

                  {searchHistory.length > 0 && (
                    <>
                      <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: theme.palette.text.secondary }}>
                        Recent Searches
                      </Typography>
                      <List dense disablePadding>
                        {searchHistory.map((item, index) => (
                          <ListItem
                            key={index}
                            button
                            onClick={() => handleHistoryClick(item)}
                            sx={{
                              py: 1,
                              '&:hover': {
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                              }
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText 
                              primary={item} 
                              primaryTypographyProps={{
                                noWrap: true,
                                color: theme.palette.text.primary
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Divider />
                    </>
                  )}

                  {trendingMovies.length > 0 && !query && (
                    <>
                      <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: theme.palette.text.secondary }}>
                        Trending Movies
                      </Typography>
                      <List dense disablePadding>
                        {trendingMovies.map((movie) => (
                          <ListItem
                            key={movie.id}
                            button
                            onClick={() => handleSuggestionClick(movie)}
                            sx={{
                              py: 1,
                              '&:hover': {
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                              }
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <TrendingUpIcon color="error" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={movie.title} 
                              secondary={movie.release_date ? new Date(movie.release_date).getFullYear() : ''}
                              primaryTypographyProps={{
                                noWrap: true,
                                color: theme.palette.text.primary
                              }}
                              secondaryTypographyProps={{
                                color: theme.palette.text.secondary
                              }}
                            />
                            <Chip 
                              label={`${movie.vote_average.toFixed(1)}`} 
                              size="small" 
                              color="primary" 
                              sx={{ ml: 1 }} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </Paper>
              </Collapse>
            </Box>
          </ClickAwayListener>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ position: "relative" }}>
          <Paper
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            elevation={focused ? 3 : 1}
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              p: "2px 4px",
              width: "100%",
              transition: "all 0.3s",
              border: focused 
                ? `1px solid ${theme.palette.primary.main}` 
                : `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
              bgcolor: theme.palette.mode === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              "&:hover": {
                boxShadow: 2
              }
            }}
          >
            <IconButton sx={{ p: '10px' }} disabled>
              <SearchIcon />
            </IconButton>
            <InputBase
              inputRef={searchInputRef}
              sx={{ 
                ml: 1, 
                flex: 1,
                color: theme.palette.text.primary,
                "& input::placeholder": {
                  color: theme.palette.text.secondary,
                  opacity: 0.7
                }
              }}
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              onFocus={() => {
                setFocused(true);
                setShowResults(true);
              }}
              autoComplete="off"
            />
            {loading ? (
              <CircularProgress size={24} sx={{ mx: 1 }} />
            ) : query ? (
              <IconButton sx={{ p: '10px' }} onClick={handleClearSearch}>
                <ClearIcon />
              </IconButton>
            ) : null}
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton 
              color="primary" 
              sx={{ p: '10px' }} 
              onClick={handleSearch}
              disabled={!query.trim()}
            >
              <SearchIcon />
            </IconButton>
          </Paper>

          {shouldShowSuggestions && showResults && (
            <Paper
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                mt: 0.5,
                maxHeight: "400px",
                overflow: "auto",
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' ? "#1e1e1e" : "#ffffff",
                boxShadow: 3,
                zIndex: 1100,
              }}
            >
              {suggestions.length > 0 && (
                <>
                  <List dense disablePadding>
                    {suggestions.map((suggestion) => (
                      <ListItem
                        key={suggestion.id}
                        button
                        onClick={() => handleSuggestionClick(suggestion)}
                        sx={{
                          py: 1,
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <MovieIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={suggestion.title} 
                          secondary={suggestion.release_date ? new Date(suggestion.release_date).getFullYear() : ''}
                          primaryTypographyProps={{
                            noWrap: true,
                            color: theme.palette.text.primary
                          }}
                          secondaryTypographyProps={{
                            color: theme.palette.text.secondary
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                </>
              )}

              {searchHistory.length > 0 && (
                <>
                  <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: theme.palette.text.secondary }}>
                    Recent Searches
                  </Typography>
                  <List dense disablePadding>
                    {searchHistory.map((item, index) => (
                      <ListItem
                        key={index}
                        button
                        onClick={() => handleHistoryClick(item)}
                        sx={{
                          py: 1,
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item} 
                          primaryTypographyProps={{
                            noWrap: true,
                            color: theme.palette.text.primary
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                </>
              )}

              {trendingMovies.length > 0 && !query && (
                <>
                  <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: theme.palette.text.secondary }}>
                    Trending Movies
                  </Typography>
                  <List dense disablePadding>
                    {trendingMovies.map((movie) => (
                      <ListItem
                        key={movie.id}
                        button
                        onClick={() => handleSuggestionClick(movie)}
                        sx={{
                          py: 1,
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <TrendingUpIcon color="error" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={movie.title} 
                          secondary={movie.release_date ? new Date(movie.release_date).getFullYear() : ''}
                          primaryTypographyProps={{
                            noWrap: true,
                            color: theme.palette.text.primary
                          }}
                          secondaryTypographyProps={{
                            color: theme.palette.text.secondary
                          }}
                        />
                        <Chip 
                          label={`${movie.vote_average.toFixed(1)}`} 
                          size="small" 
                          color="primary" 
                          sx={{ ml: 1 }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Paper>
          )}
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default SearchBar;

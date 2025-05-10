import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  useMediaQuery,
} from '@mui/material';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Movies from "./pages/Movies";



import Navbar from './components/Navbar';


function App() {
  // Detect system preference for initial theme
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#e50914',
          },
          secondary: {
            main: '#0071eb',
          },
          background: {
            default: darkMode ? '#141414' : '#f5f5f5',
            paper: darkMode ? '#1f1f1f' : '#ffffff',
          },
          text: {
            primary: darkMode ? '#ffffff' : '#000000',
            secondary: darkMode ? '#b3b3b3' : '#333333',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Arial", sans-serif',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={<Movies />} /> {/* Movies page */}
        <Route path="/movie/:id" element={<MovieDetails />} /> {/* Movie details page */}
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
      
    </ThemeProvider>
  );
}

export default App;

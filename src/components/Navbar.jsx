// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Switch,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
  Tooltip,
  Fade,
  Avatar
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  // Track scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "Movies", path: "/movies", icon: <MovieFilterIcon /> },
    { label: "Favorites", path: "/favorites", icon: <FavoriteIcon /> }
  ];

  const handleDrawerToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const mobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleDrawerToggle}
      PaperProps={{
        sx: {
          width: "80%",
          maxWidth: "320px",
          backgroundColor: darkMode ? "#121212" : "#fff",
          color: darkMode ? "#fff" : "#121212",
          borderTopLeftRadius: isSmall ? 0 : 16,
          borderBottomLeftRadius: isSmall ? 0 : 16
        }
      }}
      transitionDuration={{ enter: 400, exit: 300 }}
    >
      <Box sx={{ 
        p: 2.5, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        borderBottom: 1, 
        borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"
      }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MovieIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
          <Typography variant="h6" fontWeight="bold">
            MovieSuggest
          </Typography>
        </Box>
        <IconButton 
          onClick={handleDrawerToggle} 
          color="inherit"
          sx={{ 
            bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            '&:hover': {
              bgcolor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ pt: 1.5, pb: 2 }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            disablePadding 
            sx={{ mb: 0.5 }}
          >
            <Button
              component={Link}
              to={item.path}
              fullWidth
              onClick={handleDrawerToggle}
                              sx={{ 
                justifyContent: "flex-start", 
                px: 3, 
                py: 1.5,
                borderRadius: 2,
                mx: 1.5,
                '&:hover': {
                  bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)"
                }
              }}
              color="inherit"
              startIcon={item.icon}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.label}
              </Typography>
            </Button>
          </ListItem>
        ))}

        <Box sx={{ px: 3, py: 2.5 }}>
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              width: "100%",
              mb: 3,
              px: 1.5,
              py: 1,
              borderRadius: 2,
              bgcolor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {darkMode ? <DarkModeIcon fontSize="small" sx={{ mr: 1 }} /> : <LightModeIcon fontSize="small" sx={{ mr: 1 }} />}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {darkMode ? "Dark Mode" : "Light Mode"}
              </Typography>
            </Box>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              inputProps={{ "aria-label": "dark mode toggle" }}
              color="primary"
            />
          </Box>

          <Button
            component={Link}
            to="/login"
            variant="contained"
            fullWidth
            onClick={handleDrawerToggle}
            startIcon={<PersonIcon />}
            sx={{ 
              borderRadius: 2,
              py: 1.2,
              boxShadow: 2,
              textTransform: "none",
              fontWeight: 600
            }}
          >
            Sign In
          </Button>
        </Box>
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={scrolled ? 4 : 0}
        sx={{
          background: darkMode 
            ? scrolled ? "rgba(18, 18, 18, 0.9)" : "#121212" 
            : scrolled ? "rgba(255, 255, 255, 0.9)" : theme.palette.primary.main,
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease-in-out",
          color: darkMode ? "#fff" : !scrolled ? "#fff" : theme.palette.text.primary
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 1, sm: 2 }, py: scrolled ? 0.5 : 1 }}>
            <Box 
              component={Link} 
              to="/"
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                flexGrow: 1,
                textDecoration: "none",
                color: "inherit"
              }}
            >
              <MovieIcon 
                sx={{ 
                  mr: { xs: 1, sm: 1.5 },
                  fontSize: { xs: 24, sm: 28 },
                  color: theme.palette.primary.main,
                  bgcolor: "white",
                  p: 0.5,
                  borderRadius: "50%",
                  boxShadow: 1,
                  transition: "transform 0.2s ease-in-out",
                  '&:hover': {
                    transform: "rotate(20deg)"
                  }
                }} 
              />
              <Typography 
                variant={isSmall ? "body1" : "h6"} 
                fontWeight="bold"
                sx={{ 
                  letterSpacing: 0.5,
                  display: { xs: "none", sm: "block" }
                }}
              >
                MovieSuggest
              </Typography>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{ 
                    mx: 0.5,
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    transition: "all 0.2s",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 6,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 2,
                      backgroundColor: "currentColor",
                      transition: "width 0.3s ease-in-out"
                    },
                    "&:hover::after": {
                      width: "50%"
                    }
                  }}
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              ))}

              <Box 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  mx: 1.5,
                  bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  borderRadius: 20,
                  px: 1
                }}
              >
                <Tooltip 
                  title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  arrow
                >
                  <IconButton 
                    size="small" 
                    sx={{ color: "inherit" }}
                    onClick={toggleDarkMode}
                  >
                    {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Box>

              <Button
                component={Link}
                to="/login"
                color={darkMode ? "inherit" : scrolled ? "primary" : "inherit"}
                variant={scrolled && !darkMode ? "outlined" : "contained"}
                sx={{ 
                  ml: 2,
                  borderRadius: 20,
                  px: 2.5,
                  py: 0.8,
                  bgcolor: scrolled && !darkMode ? "transparent" : "rgba(255,255,255,0.15)",
                  border: scrolled && !darkMode ? 1 : "none",
                  borderColor: darkMode ? "currentColor" : theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: scrolled && !darkMode ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.25)",
                  },
                  textTransform: "none",
                  fontWeight: 600
                }}
                startIcon={<PersonIcon />}
              >
                Sign In
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton 
                color="inherit" 
                aria-label="open menu" 
                onClick={handleDrawerToggle}
                sx={{ 
                  bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  '&:hover': {
                    bgcolor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      {mobileMenu}
    </>
  );
}
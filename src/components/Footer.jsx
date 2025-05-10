import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MovieIcon from "@mui/icons-material/Movie";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: "auto",
        backgroundColor: (theme) => 
          theme.palette.mode === "dark" ? "#121212" : "#f5f5f5",
        borderTop: "1px solid",
        borderColor: "divider"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          {/* Brand Section - Left Side */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MovieIcon sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">MovieSuggest</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your ultimate destination for movie recommendations.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" color="primary">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary">
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary">
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
          
          {/* Right Side Container */}
          <Grid item xs={12} sm={8} container justifyContent="flex-end">
            {/* Quick Links - Right Side */}
            <Grid item xs={6} sm={4}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Quick Links
              </Typography>
              <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>Home</Link>
              <Link href="/movies" color="inherit" display="block" sx={{ mb: 1 }}>Movies</Link>
              <Link href="/favorites" color="inherit" display="block" sx={{ mb: 1 }}>Favorites</Link>
              <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>About</Link>
            </Grid>
            
            {/* Legal - Right Side */}
            <Grid item xs={6} sm={4}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Legal
              </Typography>
              <Link href="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>Privacy Policy</Link>
              <Link href="/terms" color="inherit" display="block" sx={{ mb: 1 }}>Terms of Service</Link>
            </Grid>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3, mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} MovieSuggest. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// src/components/LoadMoreButton.jsx
import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";

const LoadMoreButton = ({ hasMore, loading, onClick }) => {
  if (!hasMore) return null;
  
  return (
    <Box sx={{ textAlign: "center", mt: 4, mb: { xs: 6, sm: 4 } }}>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={loading}
        sx={{
          px: { xs: 3, sm: 4 },
          py: { xs: 1, sm: 1.5 },
          transition: "transform 0.2s",
          "&:hover:not(:disabled)": {
            transform: "translateY(-3px)"
          }
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Load More"
        )}
      </Button>
    </Box>
  );
};

export default LoadMoreButton;

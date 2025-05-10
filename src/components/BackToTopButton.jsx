// src/components/BackToTopButton.jsx
import React from "react";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BackToTopButton = ({ visible, onClick }) => {
  if (!visible) return null;
  
  return (
    <Zoom in={true}>
      <Tooltip title="Back to top">
        <IconButton
          color="primary"
          sx={{
            position: "fixed",
            bottom: { xs: 70, sm: 16 },
            right: 16,
            zIndex: 1000,
            bgcolor: "primary.main",
            color: "white",
            width: { xs: 40, sm: 40 },
            height: { xs: 40, sm: 40 },
            "&:hover": {
              bgcolor: "primary.dark",
            },
            boxShadow: 3
          }}
          onClick={onClick}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Tooltip>
    </Zoom>
  );
};

export default BackToTopButton;

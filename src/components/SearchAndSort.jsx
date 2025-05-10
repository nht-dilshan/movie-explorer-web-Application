
import React from "react";
import { Box, Button, Tooltip, Menu, MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SearchBar from "./SearchBar";

const SearchAndSort = ({ 
  onSearch, 
  sortOrder = "popularity", 
  onSortClick, 
  anchorEl, 
  open, 
  onSortClose, 
  onSortChange 
}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' }, 
      alignItems: { xs: 'stretch', sm: 'center' }, 
      gap: 2, 
      mb: 3 
    }}>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <SearchBar
          placeholder="Search for movies..."
          onSearch={onSearch}
        />
      </Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: { xs: 'flex-start', sm: 'flex-end' },
        width: { xs: '100%', sm: 'auto' }
      }}>
        <Tooltip title="Sort movies">
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={onSortClick}
            size="medium"
            sx={{ minWidth: { xs: '120px', sm: 'auto' } }}
          >
            {sortOrder === "popularity" ? "Popular" : 
             sortOrder === "top_rated" ? "Top Rated" : "Upcoming"}
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(open)}
        onClose={onSortClose}
      >
        <MenuItem onClick={() => onSortChange && onSortChange("popularity")} selected={sortOrder === "popularity"}>
          Popular
        </MenuItem>
        <MenuItem onClick={() => onSortChange && onSortChange("top_rated")} selected={sortOrder === "top_rated"}>
          Top Rated
        </MenuItem>
        <MenuItem onClick={() => onSortChange && onSortChange("upcoming")} selected={sortOrder === "upcoming"}>
          Upcoming
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SearchAndSort;

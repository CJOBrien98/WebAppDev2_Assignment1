import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Now Playing", path: "/movies/now_playing" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Upcoming", path: "/movies/upcoming" },
    //{ label: "Favorites", path: "/movies/favorites" },
    //{ label: "Watch List", path: "/movies/watchlist" },

  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  //    "My Lists" dropdown states & handlers (Menu starts line 125)
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const dropdownOpen = Boolean(dropdownAnchorEl);

  const handleDropdownClick = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  }

  const handleDropdownClose = () => {
    setDropdownAnchorEl(null);
  }

  const handleDropdownSelect = (pageURL) => {
    handleDropdownClose();
    navigate(pageURL, { replace: true });
  };



  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>

              ))}
            </>
          )}
          <div>
            <Button
              id="dropdown-button"
              aria-controls={dropdownOpen ? 'dropdown-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={dropdownOpen ? 'true' : undefined}
              onClick={handleDropdownClick}
              color="inherit"
            >
              My Lists
            </Button>
            <Menu
              id="dropdown-menu"
              aria-labelledby="dropdown-button"
              anchorEl={dropdownAnchorEl}
              open={dropdownOpen}
              onClose={handleDropdownClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => handleDropdownSelect("/movies/favorites")}>
                Favorites
              </MenuItem>
              <MenuItem onClick={() => handleDropdownSelect("/movies/watchlist")}>
                Watch List
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
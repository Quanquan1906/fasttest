import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Container,
  Tooltip,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import NotificationBell from "../common/NotificationBell";
import ThemeToggle from "../ThemeToggle";

const CustomerLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { cart } = useCart();
  const { currentUser, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const totalItems = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // menu cho profile
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", path: "/customer/dashboard" },
    { text: "Menu", path: "/customer/menu" },
  ];

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Container maxWidth="xl">
          <Toolbar>
            {/* Logo / title */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => navigate("/customer/dashboard")}
            >
              Food Ordering System
            </Typography>

            {/* Menu items */}
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color={
                  location.pathname === item.path ? "secondary" : "inherit"
                }
                onClick={() => navigate(item.path)}
                sx={{ mx: 1 }}
              >
                {item.text}
              </Button>
            ))}

            {/* Cart */}
            <IconButton
              color="inherit"
              onClick={() => navigate("/customer/checkout")}
            >
              <ShoppingCartIcon />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {totalItems}
              </Typography>
            </IconButton>

            {/* Notification */}
            <NotificationBell />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Profile */}
            <Tooltip title="Account settings">
              <IconButton sx={{ ml: 2 }} onClick={handleProfileMenuOpen}>
                <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                  {currentUser?.firstName?.charAt(0) || "U"}
                </Avatar>
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <MenuItem onClick={() => navigate("/customer/order-history")}>
                Order History
              </MenuItem>
              <MenuItem onClick={() => navigate("/customer/checkout")}>
                Checkout
              </MenuItem>
              <MenuItem onClick={() => navigate("/customer/settings")}>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Nội dung bên dưới AppBar */}
      <Toolbar /> {/* để tránh bị AppBar che mất */}
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        {children}
      </Container>
    </>
  );
};

export default CustomerLayout;

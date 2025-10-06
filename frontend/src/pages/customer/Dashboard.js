import React from "react";
import { Typography, Box } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import FoodMenu from "../../components/customer/FoodMenu";
import CustomerLayout from "../../components/layouts/CustomerLayout";
import HomeSlider from "../../components/customer/HomeSlider";

const CustomerDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <CustomerLayout>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          {/* <Typography variant="h4" gutterBottom>
            Welcome, {currentUser?.firstName || currentUser?.name || 'Customer'}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Find your favorite meals and order with just a few clicks
          </Typography> */}
          <HomeSlider />
        </Box>
      </Box>
    </CustomerLayout>
  );
};

export default CustomerDashboard;

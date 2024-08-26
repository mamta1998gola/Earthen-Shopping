import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Card, CardContent, Grid } from '@mui/material';

const initialCartItems = [
  { id: 1, name: 'Clay Pot', quantity: 2, price: 20.00 },
  { id: 2, name: 'Ceramic Vase', quantity: 1, price: 35.00 },
  { id: 3, name: 'Earthen Jug', quantity: 3, price: 15.00 },
  // Add more items as needed
];

const AddToCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleClearCart = () => {
    setCartItems([]);
  };

  const proceedToBilling = () => {
    navigate('/billing-shipping');
  }

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty!
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                    <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                    <Typography variant="body2">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Price: ${calculateTotalPrice()}</Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 2, marginRight: 2 }}
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 2 }}
              onClick={proceedToBilling}
            >
              Proceed to billing
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AddToCart;

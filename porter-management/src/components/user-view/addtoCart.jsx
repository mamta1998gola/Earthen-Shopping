import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AddToCart = () => {
  // Example cart data
  const [cartItems, setCartItems] = useState([
    { name: 'Clay Pot', quantity: 2, price: 20.00 },
    { name: 'Ceramic Vase', quantity: 1, price: 35.00 },
    { name: 'Earthen Jug', quantity: 3, price: 15.00 },
  ]);

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Product Name</strong></TableCell>
              <TableCell align="right"><strong>Quantity</strong></TableCell>
              <TableCell align="right"><strong>Price</strong></TableCell>
              <TableCell align="right"><strong>Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">₹{item.price.toFixed(2)}</TableCell>
                <TableCell align="right">₹{(item.quantity * item.price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right"><strong>Total Price</strong></TableCell>
              <TableCell align="right"><strong>₹{calculateTotalPrice()}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddToCart;

// import React from 'react';
// import { Box, Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import './ProductEditDashboard.css'; // Import the CSS file

// const products = [
//   { id: 1, name: 'Clay Pot', image: 'path/to/image1.jpg', description: 'A beautiful clay pot', price: 20.00, discountedPrice: 18.00, rating: 4 },
//   { id: 2, name: 'Ceramic Vase', image: 'path/to/image2.jpg', description: 'Elegant ceramic vase', price: 35.00, discountedPrice: 30.00, rating: 5 },
//   { id: 3, name: 'Earthen Jug', image: 'path/to/image3.jpg', description: 'Traditional earthen jug', price: 15.00, discountedPrice: 12.00, rating: 3 },
//   // Add more products as needed
// ];

// const ProductEditDashboard = () => {
//   const navigate = useNavigate();

//   const handleEdit = (productId) => {
//     navigate(`/edit-product/${productId}`);
//   };

//   return (
//     <Box className="dashboard-container">
//       <Grid container spacing={2} className="product-grid">
//         {products.map((product) => (
//           <Grid item xs={12} sm={6} md={3} key={product.id}>
//             <Card className="product-card">
//               <CardMedia
//                 component="img"
//                 image={product.image}
//                 alt={product.name}
//                 sx={{ height: 0, paddingTop: '60%' }}
//               />
//               <CardContent className="product-card-content">
//                 <Typography variant="h6" component="div" className="product-card-title">
//                   {product.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" className="product-card-description">
//                   {product.description}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" className="product-card-price">
//                   <s>${product.price.toFixed(2)}</s> ${product.discountedPrice.toFixed(2)}
//                 </Typography>
//                 <Typography variant="body2" className="product-card-rating">
//                   {'⭐'.repeat(product.rating)}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   className="product-card-button"
//                   onClick={() => handleEdit(product.id)}
//                 >
//                   Edit Product Details
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default ProductEditDashboard;


import React from "react";
import { useNavigate } from 'react-router-dom';
import "./ProductEditDashboard.css";

const products = [
  {
    id: 1,
    title: "Clay Pot",
    description: "Handcrafted clay pot with a traditional design.",
    originalPrice: 300.0,
    discountedPrice: 200.0,
    rating: 4,
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    id: 2,
    title: "Clay Vase",
    description: "Elegant clay vase perfect for home decor.",
    originalPrice: 500.0,
    discountedPrice: 350.0,
    rating: 5,
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    id: 3,
    title: "Clay Pot",
    description: "Handcrafted clay pot with a traditional design.",
    originalPrice: 300.0,
    discountedPrice: 200.0,
    rating: 4,
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    id: 4,
    title: "Clay Vase",
    description: "Elegant clay vase perfect for home decor.",
    originalPrice: 500.0,
    discountedPrice: 350.0,
    rating: 5,
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    id: 5,
    title: "Clay Pot",
    description: "Handcrafted clay pot with a traditional design.",
    originalPrice: 300.0,
    discountedPrice: 200.0,
    rating: 4,
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    id: 6,
    title: "Clay Vase",
    description: "Elegant clay vase perfect for home decor.",
    originalPrice: 500.0,
    discountedPrice: 350.0,
    rating: 5,
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    id: 7,
    title: "Clay Pot",
    description: "Handcrafted clay pot with a traditional design.",
    originalPrice: 300.0,
    discountedPrice: 200.0,
    rating: 4,
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    id: 8,
    title: "Clay Vase",
    description: "Elegant clay vase perfect for home decor.",
    originalPrice: 500.0,
    discountedPrice: 350.0,
    rating: 5,
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  // Add more products as needed
];

const ProductEditDashboard = () => {
  const navigate = useNavigate();

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="products-dashboard">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-details">
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <div className="product-pricing">
              <span className="original-price">₹{product.originalPrice}</span>
              <span className="discounted-price">₹{product.discountedPrice}</span>
            </div>
            <div className="product-rating">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`star ₹{index < product.rating ? "filled" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>
            <button className="add-to-cart-btn" onClick={() => handleEdit(product.id)}>Edit Product Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductEditDashboard;

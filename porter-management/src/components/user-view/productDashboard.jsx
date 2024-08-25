import React from "react";
import "./ProductsDashboard.css";

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

const ProductsDashboard = () => {
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
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsDashboard;

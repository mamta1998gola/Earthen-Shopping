import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./ProductForm.css";

// Validation schema using Yup
const schema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  productImage: yup
    .mixed()
    .required("Product image is required")
    .test("fileSize", "File size too large", (value) => {
      return value && value[0] && value[0].size <= 2 * 1024 * 1024; // 2MB max
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      return (
        value &&
        value[0] &&
        ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
      );
    }),
  description: yup.string().required("Description is required"),
  originalPrice: yup
    .number()
    .typeError("Original price must be a number")
    .required("Original price is required")
    .positive("Original price must be positive"),
  discountedPrice: yup
    .number()
    .typeError("Discounted price must be a number")
    .required("Discounted price is required")
    .positive("Discounted price must be positive")
    .max(yup.ref("originalPrice"), "Discounted price cannot be greater than original price"),
  city: yup.string().required("Seller's city is required"),
  mobileNumber: yup
    .string()
    .matches(/^[6-9]\d{9}₹/, "Mobile number is not valid")
    .required("Mobile number is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  upiId: yup
    .string()
    .matches(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}₹/, "Invalid UPI ID format")
    .required("UPI ID is required"),
});

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
    // You would typically send the data to the backend API here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <div className="form-group">
        <label>Product Name</label>
        <input type="text" {...register("productName")} />
        {errors.productName && <p className="error-message">{errors.productName.message}</p>}
      </div>

      <div className="form-group">
        <label>Product Image</label>
        <input type="file" {...register("productImage")} />
        {errors.productImage && <p className="error-message">{errors.productImage.message}</p>}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea {...register("description")} />
        {errors.description && <p className="error-message">{errors.description.message}</p>}
      </div>

      <div className="form-group">
        <label>Original Price</label>
        <input type="number" {...register("originalPrice")} />
        {errors.originalPrice && <p className="error-message">{errors.originalPrice.message}</p>}
      </div>

      <div className="form-group">
        <label>Discounted Price</label>
        <input type="number" {...register("discountedPrice")} />
        {errors.discountedPrice && <p className="error-message">{errors.discountedPrice.message}</p>}
      </div>

      <div className="form-group">
        <label>Seller's City</label>
        <input type="text" {...register("city")} />
        {errors.city && <p className="error-message">{errors.city.message}</p>}
      </div>

      <div className="form-group">
        <label>Mobile Number</label>
        <input type="text" {...register("mobileNumber")} />
        {errors.mobileNumber && <p className="error-message">{errors.mobileNumber.message}</p>}
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input type="email" {...register("email")} />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label>UPI ID</label>
        <input type="text" {...register("upiId")} />
        {errors.upiId && <p className="error-message">{errors.upiId.message}</p>}
      </div>

      <button type="submit" className="submit-button">Add Product</button>
    </form>
  );
};

export default ProductForm;

"use client";
import React, { useState } from "react";
import products from "../app/products";
import styles from "../Styles/Tracker.module.css";
import axios from "axios";

const Tracker = () => {
  const [cartItems, setCartItems] = useState([]);
  const [rating, setRating] = useState(0);

  // Retrieve the Tracker product from the products array
  const trackerProduct = products.find((product) => product.slug === "tracker");

  // State for tracking the quantity
  const [quantity, setQuantity] = useState(1);

  // Check if trackerProduct exists before accessing its properties
  if (!trackerProduct) {
    return <div>Product not found</div>;
  }

  // Calculate total price based on quantity
  const totalPrice = trackerProduct.price * quantity;

  // Handler for increasing quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Handler for decreasing quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addToCart = (itemName, quantity) => {
    console.log(`Adding to cart: ${itemName}, Quantity: ${quantity}`);

    const itemsToAdd = Array.from({ length: quantity }, () => itemName);
    setCartItems((prevItems) => [...prevItems, ...itemsToAdd]);

    axios
      .post("http://localhost:4000/add_to_card", { itemName, quantity })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={trackerProduct.imageUrl} alt={trackerProduct.name} />
        </div>
        <div className={styles.details}>
          <h1>{trackerProduct.name}</h1>
          <div className={styles.rating}>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={index < rating ? styles.filledStar : styles.emptyStar}
                onClick={() => handleRatingChange(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
          <p className={styles.additional_text}>
            Monitor your dog’s exercise, rest, weight and more<br /> so you know
            they’re always getting what they need.
            <br />
            Save $9 when you buy two monitors, or $16 when you<br /> buy three
            monitors with our multi-buy discount!
          </p>
          <p>Category: {trackerProduct.categoryName}</p>
          <p>Total Price: ${totalPrice}</p>
          {/* Add more details as needed */}
          <div className={styles.counter}>
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
          <button
            className={styles.button}
            onClick={() => addToCart("Tracker", quantity)}
          >
            Add to Cart
          </button>
          {/* Include the payment image */}
          <img
            src={"./image/paimentcollection.png"}
            alt="Accepted Payment Methods"
            className={styles.paymentImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Tracker;

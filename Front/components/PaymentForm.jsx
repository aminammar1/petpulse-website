"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../Styles/PaymentForm.module.css';
import productsData from "../app/products";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const PaymentForm = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:4000/cart_items');
                setCartItems(response.data.items);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [cartItems]);

    const findItemPrice = (itemName) => {
        const adjustedItemName = itemName.toLowerCase();
        const product = productsData.find(product => product.name.toLowerCase().includes(adjustedItemName));
        return product ? product.price : 'Price not available';
    };

    const getImage = (itemName) => {
        const imageMap = {
            "Tracker": "./image/monitor.png",
            "Tracker_plus": "./image/monitorplus.png",
            "Strap": "./image/streatche1.png",
            "CR1632 battery": "./image/pille1.png",
            "CR2032 battery": "./image/pille2.png",
            "Charging pad": "./image/pp.6.gif"
        };
        return imageMap[itemName] || null;
    };

    const consolidateItems = () => {
        const consolidatedItems = [];
        cartItems.forEach(item => {
            const existingItem = consolidatedItems.find(ci => ci.itemName === item.itemName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                consolidatedItems.push({ itemName: item.itemName, quantity: 1 });
            }
        });
        return consolidatedItems;
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        const consolidatedCartItems = consolidateItems();
        consolidatedCartItems.forEach(item => {
            const price = parseFloat(findItemPrice(item.itemName));
            if (!isNaN(price)) {
                totalPrice += price * item.quantity;
            }
        });
        return totalPrice.toFixed(2);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = {
                email: event.target.email.value,
                cardNumber: event.target['card-number'].value,
                expirationDate: event.target['expiration-date'].value,
                cvv: event.target.cvv.value,
                cardOwnerName: event.target['card-owner-name'].value,
                country: event.target.country.value,
                totalPrice: totalPrice // Include the total price here
            };
            const response = await axios.post('http://localhost:4000/save_payment', formData);
            console.log(response.data);
            toast.success('Payment successful!', { position: 'top-center' });
            event.target.reset();
        } catch (error) {
            console.error('Error saving payment data:', error);
            toast.error('Payment failed. Please try again.', { position: 'top-center' });
        }
    };

    const consolidatedCartItems = consolidateItems();

    return (
        <div className={styles.mainContainer}>
            <div className={styles.blurBackground}></div>
            <div className={styles.flexContainer}>
                <div className={styles.cartItemsContainer}>
                    <img src={"./image/petpulse.png"} alt="pp" className={styles.pp} />
                    <h3>Cart Items:</h3>
                    <ul>
                        {consolidatedCartItems.map((item, index) => (
                            <li key={index} className={styles.productItem}>
                                <div className={styles.productContainer}>
                                    <img src={getImage(item.itemName)} alt={item.itemName} className={styles.cartItemImage} />
                                    <div className={styles.productDetails}>
                                        <p className={styles.productName}>{item.itemName}</p>
                                        <p className={styles.productQuantity}>Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className={styles.productPrice}>${findItemPrice(item.itemName)}</div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.totalPrice}>Total Price: ${totalPrice}</div>
                </div>
                <div className={styles.paymentFormContainer}>
                    <div className={styles.paymentForm}>
                        <h2>Payment Form</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required aria-label="Email" />
                            <label htmlFor="card-info">Card Information</label>
                            <div id="card-info" className={styles.cardInfo}>
                                <input type="text" id="card-number" name="card-number" pattern="\d{8}" title="Card number must be 8 digits" placeholder="Card Number" required aria-label="Card Number" />
                                <div className={styles.cardIcons}>
                                    <img src={"./image/visa.png"} alt="Visa" className={styles.visa} />
                                    <img src={"./image/sans-contact.png"} alt="Contactless Payment" className={styles.sans_contact} />
                                </div>
                                <div className={styles.splitFields}>
                                    <input type="text" id="expiration-date" name="expiration-date" placeholder="Expiration Date (MM/YYYY)" required pattern="(0[1-9]|1[0-2])/\d{4}" title="Expiration Date must be in the format DD/MM/YYYY" aria-label="Expiration Date" />
                                    <input type="text" id="cvv" name="cvv" placeholder="CVV" pattern="\d{3}" required aria-label="CVV" />
                                </div>
                            </div>
                            <label htmlFor="card-owner-name">Card Owner Name</label>
                            <input type="text" id="card-owner-name" name="card-owner-name" required aria-label="Card Owner Name" />
                            <label htmlFor="country">Country</label>
                            <select id="country" name="country" required aria-label="Country">
                                <option value="" disabled>Select Country</option>
                                <option value="Tunisia">Tunisia</option>
                            </select>
                            <div className={styles.submitContainer}>
                                <button type="submit" className={styles.submitButton}>Purchase</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PaymentForm;

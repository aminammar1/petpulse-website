"use client";
import React from 'react';
import axios from 'axios';
import styles from '../Styles/PaymentForm2.module.css';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const InsurancePayment = () => {
    // Retrieve offer details from local storage
    const offerName = localStorage.getItem('offerName');
    const offerImage = localStorage.getItem('offerImage');
    const offerPrice = localStorage.getItem('offerPrice'); // Retrieve offer price

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
                totalPrice: offerPrice, // Include the offer price here
                Offername: offerName // Include the offer name here
            };
            const response = await axios.post('http://localhost:4000/save_payment2', formData);
            console.log(response.data);
            toast.success('Payment successful!'); // Fixed toast notification
            event.target.reset();
        } catch (error) {
            console.error('Error saving payment data:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Payment failed. Please try again.'); // Display server error message if available
            } else {
                toast.error('Payment failed. Please try again.'); // Display generic error message
            }
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.blurBackground}></div>
            <div className={styles.flexContainer}>
                <div className={styles.cartItemsContainer}>
                    <img src={"./image/petpulse.png"} alt="pp" className={styles.pp} />
                    <img src={offerImage} alt="Offer" className={styles.offerImage} />
                    <hr className={styles.horizontalLine} /> {/* Horizontal line */}
                    <div>
                        <h3>Offer: {offerName}</h3>
                        <h4>Price: ${offerPrice}</h4> {/* Display offer price */}
                    </div>
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
            <ToastContainer position="top-center" /> {/* Set position as per your preference */}
        </div>
    );
};

export default InsurancePayment;

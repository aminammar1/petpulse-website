"use client";
import { useState, useEffect } from 'react';
import styles from "../styles/purches_insurance.module.css"; // Ensure the path is correct
import Link from 'next/link';

export default function Purches() {
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    return () => {
      // Clean up function to remove offer details from local storage when component unmounts
      localStorage.removeItem('offerName');
      localStorage.removeItem('offerImage');
      localStorage.removeItem('offerPrice'); // Remove offer price as well
    };
  }, []);

  const handleBuyNow = (offerName, offerImage, offerPrice) => { // Include offerPrice parameter
    console.log("Buy now clicked:", offerName, offerImage, offerPrice);
    // Save offer details in local storage
    localStorage.setItem('offerName', offerName);
    localStorage.setItem('offerImage', offerImage);
    localStorage.setItem('offerPrice', offerPrice); // Save offer price
    setSelectedOffer({ offerName, offerImage });
    console.log("Offer details saved:", offerName, offerImage, offerPrice);
  };

  return (
    <div className={styles.Maincontainer}>
      <div className={styles.offersContainer}>
        <div className={styles.container1}>
          <img src="/image/t1.png" alt="tab" className={styles.tabImage} />
          <Link href="/insurance_payment">
            <button onClick={() => handleBuyNow("SHARE", "/image/t1.png", 199)} className={styles.signInButton}>BUY NOW</button>
          </Link>
        </div>
        <div className={styles.container1}>
          <img src="/image/t2.png" alt="tab" className={styles.tabImage} />
          <Link href="/insurance_payment">
            <button onClick={() => handleBuyNow("CARE", "/image/t2.png", 299)} className={styles.signInButton}>BUY NOW</button>
          </Link>
        </div>
      </div>
      <h1 className={styles.captcha}>choose your offer!</h1>
      {/* You can render any component based on selectedOffer if needed */}
    </div>
  );
}

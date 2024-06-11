"use client"
import { useState, useEffect } from 'react';
import styles from "../Styles/insurance.module.css";
import Link from 'next/link';

export default function Insur() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    setIsLoggedIn(!!email);
  }, []);

  const handlePurchaseClick = () => {
    if (!isLoggedIn) {
      alert("Please log in to purchase insurance.");
    } else {
      // Navigate to purchase insurance page
      window.location.href = "/purches_insurance";
    }
  };

  return (
    <div className={styles.Maincontainer}>
      <div className={styles.container1}>
        <img src="./image/tab.png" alt="tab" className={styles.tab33} />
        <img src="./image/Untitled-1 (2).png" alt="Second Home Dog" className={styles.fullWidthImage} />
        {/* Render the Link conditionally based on user's login status */}
        {isLoggedIn ? (
          <Link href="/purches_insurance">
            <span className={styles.signInButton}>BUY NOW</span>
          </Link>
        ) : (
          <span className={styles.signInButton} onClick={handlePurchaseClick}>BUY NOW</span>
        )}
      </div>
      {/* Other parts of your component */}
      <div className={styles.container2}>
        <p className={styles.p1}><b>Zero excess</b>, max protection</p>
        <p className={styles.p2}><b>Excesses suck.</b> Other insurers make you pay an excess, but with PetPulse <b>CARE</b>,
          provided you exercise your dog regularly*, we’ll pay your veterinary
          fee excess if you ever need to claim.</p>
        <img src="./image/Happy.png" alt="Happy" className={styles.Happy} />
      </div>
      <div className={styles.container3}>
        <p className={styles.p3}><b>Dog insurance,</b> made simple</p>
        <p className={styles.p4}>Super quick quoting, clear documentation and straightforward claims <b>all</b> in the palm of your hand.</p>
        <img src="./image/double.png" alt="double" className={styles.double} />
        <Link href="/">
          <span className={styles.AppButton}>Get a quote in the PetPulse app</span>
        </Link>
      </div>
      <div className={styles.container4}>
        <p className={styles.p5}><b>Rewards </b> for walkies</p>
        <p className={styles.p6}>Whether you’re already part of our VIP club or not, you’ll get your  <b>PetPulse LIFE</b> membership
          included whilst you have a PetPulse<b>PetPulse LIFE</b>policy, making you part of a club of <b>incredibly </b> exclusive pet parents.</p>
        <img src="./image/happy2.png" alt="happy2" className={styles.happy2} />
      </div>
      <div className={styles.container5}>
        <p className={styles.p7}>Already <b> insured?</b></p>
        <p className={styles.p8}>We get it. Things don’t always line up perfectly. Set a reminder below and we’ll get in touch before your renewal.</p>
        <img src="./image/3.png" alt="insured" className={styles.insured} />
        <Link href="/reminder">
          <span id="remindMeButton" className={styles.insuranceButton}>Remind me please</span>
        </Link>
        <img src="./image/pp10.png" alt="pp10" className={styles.pp10} />
      </div>
    </div>
  );
}

"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import styles from "../Styles/Home.module.css"
import { useRouter } from 'next/navigation';
import SignUp from "@/components/SIGN";
import Navbar from "@/components/Navbar";
import ForgotPassword from "@/components/ForgotP";
import ResetPassword from "@/components/ResetP";
import Footer from '@/components/Footer';
import LOG from '@/components/LOG';
import Login from './login/page';
import shop from './shop/page';
import tracker from './tracker/page';
import tracker_plus from './tracker_plus/page';
import pille1 from './pille1/page';
import pille2 from './pille2/page';
import charging_pad from './charging_pad/page';
import cart from './Cart/page';
import PaymentForm from './paymentform/page';
import Insur from '@/components/INSURE';


export default function Home() {
  return (
    <div className={styles.containerplus}>
      <div className={styles.container}>
        <img className={styles.logo} src="./image/alpha_dog.png" alt="PetPulse Logo" />
        <div className={styles.partnerText}>YOUR PARTNER IN PET WELLNESS</div>
        <p className={styles.exclusiveText}>Sign up to get exclusive offers</p>
        <Link href="/signup">
          <span className={styles.signInButton}>Sign Up</span>
        </Link>
      </div>
      <div className={styles.fullWidthImage}>
        <img src="./image/homedog2.jpg" alt="Second Home Dog" className={styles.fullWidthImage} />
        <img src="./image/monitor.png" alt="Monitor" className={styles.overlayImage} />
        <img src="./image/monitorplus.png" alt="Monitorplus" className={styles.overlayImage2} />
        <img src="./image/phone.png" alt="Mapmobile" className={styles.overlayImage3} />
        <Link href="/gps">
          <span className={styles.exploreGPS}>Explore PETPULSE GPS</span>
        </Link>
        <Link href="/tracker">
          <span className={styles.Explore_Monitor}>Explore PETPULSE Monitor</span>
        </Link>
      </div>

      <h1 className={styles.caption}>PETPULSE application, your partner in pet wellness..</h1>


      <div className={styles.phoneContainer}>
        <img src="./image/phone1.png" alt="phone1" className={styles.phone} />
        <img src="./image/phone2.png" alt="phone2" className={styles.phone} />
        <img src="./image/phone3.png" alt="phone3" className={styles.phone} />
        <img src="./image/phone4.png" alt="phone4" className={styles.phone} />
      </div>

      <div className={styles.dd3}>
      <img src="./image/homedog3.jpg" alt="Third Home Dog" className={styles.fullWidthImage} /> {/* Add this line */}
      <h1 className={styles.text3}>PetPulse</h1>
      <p className={styles.paragraphe3}>
         PETPULSE is your go-to app for tracking your pet's health and well-being.
         With features designed to streamline pet care, including health records
         medication reminders, activity tracking, and appointment scheduling, 
         PetPulse ensures your furry friend stays happy and healthy. Whether
         you're a pet parent or a pet professional, PetPulse makes it easy
         to stay organized and proactive in caring for your beloved companion.</p>
         <img src="./image/double.png" alt="double phone" className={styles.double_phone} /> {/* Add this line */}
      </div>
      <div className={styles.cat1}>
      <img src="./image/big_cat.png" alt="big cat" className={styles.cat1} />
      <div className={styles.takeCareTextContainer}>
          <h1 className={styles.takeCareText}>Take care of your pet with <h2 className={styles.takeCareText2}>PETPULSE</h2></h1>
      </div>
      <img src="./image/food.png" alt="food ball" className={styles.food_ball} />
      </div>
      <div className={styles.cat2}>
      <img src="./image/pp10.png" alt="line" className={styles.line} />
      <img src="./image/line_dog.png" alt="line_dog" className={styles.line_dog} />
      </div>
      <div className={styles.cat3}>
      <img src="./image/collection.png" alt="collection" className={styles.collection} />
      <div className={styles.social_icons}>
         <Link href="https://www.facebook.com">
             <img src="./image/fb.png" alt="Facebook" className={styles.social} />
         </Link>
         <Link href="https://www.linkedin.com">
             <img src="./image/linkedin.png" alt="LinkedIn" className={styles.social} />
         </Link>
         <Link href="https://www.instagram.com">
             <img src="./image/insta.png" alt="Instagram" className={styles.social} />
         </Link>
      <div>
            <img src="./image/web.png" alt="web" className={styles.web} />
            <Link href="/">
              <span className={styles.Explore_website}>www.petpulse.com</span>
            </Link>
      </div>
      <div>
            <img src="./image/enveloppe.png" alt="env" className={styles.env} />
            <span className={styles.Explore_Email}>petpulse@gmail.com</span>
      </div>
      </div>
      </div>
    </div>
  );
};

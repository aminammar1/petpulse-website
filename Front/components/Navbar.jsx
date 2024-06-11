"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../Styles/Nav.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [showMonitorImages, setShowMonitorImages] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showInsuranceOptions, setShowInsuranceOptions] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);
  const [scrollToButton, setScrollToButton] = useState(false);
  const [animateCartCount, setAnimateCartCount] = useState(false);

  useEffect(() => {
    const cartInterval = setInterval(fetchCartItemsCount, 100);
    const loginInterval = setInterval(checkLoginStatus, 1000);
    return () => {
      clearInterval(cartInterval);
      clearInterval(loginInterval);
    };
  }, []);

  useEffect(() => {
    if (scrollToButton) {
      const element = document.getElementById("remindMeButton");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setScrollToButton(false);
    }
  }, [scrollToButton]);

  useEffect(() => {
    if (animateCartCount) {
      const timer = setTimeout(() => {
        setAnimateCartCount(false);
      }, 1000); // Reset after 1 second
      return () => clearTimeout(timer);
    }
  }, [animateCartCount]);

  const fetchCartItemsCount = async () => {
    try {
      const response = await axios.get("http://localhost:4000/CartItemsCount");
      const { count } = response.data;
      setCartCount((prevCount) => {
        if (prevCount !== count) {
          setAnimateCartCount(true);
        }
        return count;
      });
    } catch (error) {
      console.error("Error fetching cart items count:", error);
    }
  };

  const checkLoginStatus = () => {
    const email = localStorage.getItem("email");
    if (email) {
      setIsLoggedIn(true);
      setUsername(email); // Or fetch the username based on the email
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  const handleTrackersMouseEnter = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    setShowMonitorImages(true);
  };

  const handleTrackersMouseLeave = () => {
    const timer = setTimeout(() => {
      setShowMonitorImages(false);
    }, 3000);
    setHoverTimer(timer);
  };

  const handleMonitorMouseEnter = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  const handleMonitorMouseLeave = () => {
    const timer = setTimeout(() => {
      setShowMonitorImages(false);
    }, 1000);
    setHoverTimer(timer);
  };

  const handleInsuranceMouseEnter = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    setShowInsuranceOptions(true);
  };

  const handleInsuranceMouseLeave = () => {
    const timer = setTimeout(() => {
      setShowInsuranceOptions(false);
    }, 500);
    setHoverTimer(timer);
  };

  const handleInsuranceOptionMouseEnter = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  const handleInsuranceOptionMouseLeave = () => {
    const timer = setTimeout(() => {
      setShowInsuranceOptions(false);
    }, 2000);
    setHoverTimer(timer);
  };

  const handleAlreadyInsuredClick = (e) => {
    e.preventDefault();
    router.push("/Insurance");
    setScrollToButton(true);
  };

  return (
    <div className="background-image">
      <div className={styles.navbar}>
        <img className={styles.pp} src="./image/pp90.png" alt="pp" />
        <Link href="/">
          <span>
            <img
              className={styles.logo}
              src="./image/petpulse.png"
              alt="PetPulse Logo"
            />
          </span>
        </Link>
        <div className={styles.middleLinks}>
          <div
            className={styles.trackersContainer}
            onMouseEnter={handleTrackersMouseEnter}
            onMouseLeave={handleTrackersMouseLeave}
          >
            <Link href="/Trackers" className={styles.navLink}>
              <span className={styles.linkText}>Trackers</span>
            </Link>
            {showMonitorImages && (
              <div className={styles.popupAngle}>
                <Link href="/tracker_plus">
                  <img
                    className={`${styles.popupImageLeft} ${
                      isPulsing ? styles.pulse : ""
                    }`}
                    src="./image/monitorplus.png"
                    alt="Monitor Plus"
                    onMouseEnter={handleMonitorMouseEnter}
                    onMouseLeave={handleMonitorMouseLeave}
                  />
                </Link>
                <Link href="/tracker">
                  <img
                    className={`${styles.popupImageRight} ${
                      isPulsing ? styles.pulse : ""
                    }`}
                    src="./image/monitor.png"
                    alt="Monitor"
                    onMouseEnter={handleMonitorMouseEnter}
                    onMouseLeave={handleMonitorMouseLeave}
                  />
                </Link>
              </div>
            )}
          </div>
          <div
            className={styles.insuranceContainer}
            onMouseEnter={handleInsuranceMouseEnter}
            onMouseLeave={handleInsuranceMouseLeave}
          >
            <Link href="/Insurance" className={styles.navLink}>
              <span className={styles.linkText}>Insurance</span>
            </Link>
            {showInsuranceOptions && (
              <div
                className={styles.popupInsurance}
                onMouseEnter={handleInsuranceOptionMouseEnter}
                onMouseLeave={handleInsuranceOptionMouseLeave}
              >
                <Link href="/Insurance" className={styles.insuranceOption}>
                  Find out more
                </Link>
                <Link
                  href="/already-insured"
                  className={styles.insuranceOption}
                  onClick={handleAlreadyInsuredClick}
                >
                  Already insured
                </Link>
                <Link href="/vetclaim" className={styles.insuranceOption}>
                  Veterinarian
                </Link>
              </div>
            )}
          </div>
          <Link href="/shop" className={styles.navLink}>
            <span className={styles.linkText}>Shop</span>
          </Link>
          <Link href="/FAQs" className={styles.navLink}>
            <span className={styles.linkText}>FAQs</span>
          </Link>
          <Link href="/contact" className={styles.navLink}>
            <span className={styles.linkText}>Contact Us</span>
          </Link>
        </div>
        <Link href="/IA" className={styles.languageContainer}>
          <div className={styles.languageSelector}>
            <img className={styles.languageIcon} src="./image/dog.png" />
          </div>
        </Link>
        <Link href="/Cart" className={styles.cartImage}>
          <div className={styles.cartContainer}>
            <img
              className={styles.cartImage}
              src="./image/bag.svg"
              alt="cart"
            />
            <span
              className={`${styles.cartItemCount} ${
                animateCartCount ? styles.greenBackground : ""
              }`}
            >
              {cartCount}
            </span>
          </div>
        </Link>
        <div className={styles.userContainer}>
          <Link
            href={isLoggedIn ? "/user-profile" : "/login"}
            className={styles.logolink}
          >
            <img
              className={styles.signImage}
              src={
                isLoggedIn
                  ? "./image/user.png"
                  : "./image/box-arrow-in-left.svg"
              }
              alt="User Profile"
            />
          </Link>
        </div>
        <img className={styles.pp2} src="./image/pp90.png" alt="pp2" />
      </div>
    </div>
  );
}

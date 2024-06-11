/* HeroBanner.jsx */
"use client";
import React from 'react';
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiArrowBack } from "react-icons/bi";
import { Carousel } from "react-responsive-carousel";
import styles from "../Styles/HeroBanner.module.css";
import products from "../app/products";

const HeroBanner = () => {
  const renderArrowPrev = (clickHandler, hasPrev) => (
    <div className={`${styles.arrowPrev} ${styles.arrow}`} onClick={clickHandler}>
      <BiArrowBack className={styles.textIcon} />
    </div>
  );

  const renderArrowNext = (clickHandler, hasNext) => (
    <div className={`${styles.arrowNext} ${styles.arrow}`} onClick={clickHandler}>
      <BiArrowBack className={`${styles.rotateIcon} ${styles.textIcon}`} />
    </div>
  );

  return (
    <div className={styles.relative}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={renderArrowPrev}
        renderArrowNext={renderArrowNext}
      >
        <div className={styles.slideContainer}>
          <img src="/image/ps1.png" alt="Slide 1" className={styles.slideImage} />
        </div>
        <div className={styles.slideContainer}>
          <img src="/image/ps2.png" alt="Slide 2" className={styles.slideImage} />
        </div>
        <div className={styles.slideContainer}>
          <img src="/image/ps3.png" alt="Slide 3" className={styles.slideImage} />
        </div>
      </Carousel>
      <div className={styles.shop_color}>
        <div className="bg-white">
        <div className="mx-auto max-w-2xl">
          <div className="flex justify-between items-center">
            <h2 className="title">Our Newest products:</h2>
          </div>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <Link href={`/${product.slug}`} key={product.slug} passHref>
                <button className={styles.productLink}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={styles.productImage}
                    width={300}
                    height={300}
                  />
                  <div className={styles.productDetails}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productCategory}>{product.categoryName}</p>
                    <p className={styles.productPrice}>${product.price}</p>
                  </div>
                </button>
              </Link>
            ))}  
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

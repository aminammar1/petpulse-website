"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/ContactPage.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/Reclamation', form);
      console.log(response.data.message);
      // Optionally, reset the form after successful submission
      setForm({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error saving reclamation data:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.contact}>Contact us</h1>
        <p className={styles.largeText}>
          Got a question before you buy? Try our <Link href="/faqs"><p className={styles.link}>FAQs page</p></Link> for lots of product info.
          Need help with your PetPulse? Our Knowledge Base might have the answer.
        </p>
        <p className={styles.largeText}>
          If you’d like to talk with us, you can reach us by email, by phone (09:00–17:00 Monday–Saturday),<br/> or by post. Or just fill in the form on this page if you prefer.
        </p>
        <p className={styles.contactDetail}>
          <img src={"./image/enveloppe.png"} alt="Email" className={styles.iconi} />
          <span className={styles.email}>Email: PetPulse@gmail.com</span>
        </p>
        <p className={styles.contactDetail}>
          <img src={"./image/location.png"} alt="Address" className={styles.icon} />
          <span className={styles.info}>Address: Monastir 5000</span>
        </p>
        <p className={styles.contactDetail}>
          <img src={"./image/telephone.png"} alt="Phone" className={styles.icon} />
          <span className={styles.info}>Phone: +216 12345678</span>
        </p>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.formBox}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Your message to us</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={styles.textarea}
                required
              />
            </div>
            <button type="submit" className={styles.button}>Send your message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

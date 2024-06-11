"use client";
import styles from '../Styles/Reminder.module.css';
import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Reminder() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      firstName: event.target['first-name'].value,
      lastName: event.target['last-name'].value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      renewalMonth: event.target['renewal-month'].value,
      currentInsurance: event.target['current-insurance'].value,
      country: event.target.country.value,
    };

    try {
      const response = await axios.post('http://localhost:4000/save_reminder', formData);
      console.log(response.data);
      toast.success('Reminder saved successfully!', { position: 'top-center' });
      event.target.reset();
    } catch (error) {
      console.error('Error saving reminder data:', error);
      toast.error('Failed to save reminder. Please try again.', { position: 'top-center' });
    }
  };

  return (
    <div className="main_container">
      <div className={styles.mainContainer}>
        <div className={styles.blurBackground}></div>
        <div className={styles.flexContainer}>
          <div className={styles.formContainer}>
            <div className={styles.form}>
              <h1 className={styles.h1}>Already insured?</h1>
              <form onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="first-name">Name*</label>
                <div className={styles.nameFields}>
                  <input 
                    type="text" 
                    id="first-name" 
                    name="first-name" 
                    placeholder="First Name" 
                    required 
                    aria-label="First Name" 
                    pattern="[A-Za-z]+" 
                    title="First name should contain only letters" 
                  />
                  <input 
                    type="text" 
                    id="last-name" 
                    name="last-name" 
                    placeholder="Last Name" 
                    required 
                    aria-label="Last Name" 
                    pattern="[A-Za-z]+" 
                    title="Last name should contain only letters" 
                  />
                </div>

                <label className={styles.label} htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Email" 
                  required 
                  aria-label="Email" 
                />
                
                <label className={styles.label} htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="+44" 
                  required 
                  aria-label="Phone Number" 
                  pattern="\+?\d{10,15}" 
                  title="Phone number must be between 10 and 15 digits" 
                />
                
                <div className={styles.inlineFields}>
                  <div className={styles.fieldContainer}>
                    <label className={styles.label} htmlFor="renewal-month">Insurance Renewal Month*</label>
                    <input 
                      type="month" 
                      id="renewal-month" 
                      name="renewal-month" 
                      required 
                      aria-label="Insurance Renewal Month" 
                    />
                  </div>
                  <div className={styles.fieldContainer}>
                    <label className={styles.label} htmlFor="current-insurance">Who Do You Currently Hold Insurance With?</label>
                    <input 
                      type="text" 
                      id="current-insurance" 
                      name="current-insurance" 
                      placeholder="Insurance holder" 
                      required 
                      aria-label="Current Insurance Holder" 
                      pattern="[A-Za-z\s]+" 
                      title="Insurance holder should contain only letters and spaces" 
                    />
                  </div>
                </div>
                
                <label className={styles.label} htmlFor="country">Country</label>
                <select 
                  id="country" 
                  name="country" 
                  required 
                  aria-label="Country"
                >
                  <option value="" disabled>Select Country</option>
                  <option value="Tunisia">Tunisia</option>
                </select>
                <p className={styles.captcha}>We will wait for you to join our community!</p>
                <img src={"./image/pointer.gif"} alt="pointer" className={styles.pointer} />
                <div className={styles.submitContainer}>
                  <button type="submit" className={styles.submitButton}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

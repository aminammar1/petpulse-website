"use client";
import styles from '../Styles/Vet_Claim.module.css';
import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function VetClaim() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    insuranceNumber: '',
    petName: '',
    country: '',
    fullAddress: '',
    dob: '',
    issue: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const validateForm = () => {
    const { firstName, lastName, email, phone, insuranceNumber, petName, country, fullAddress, dob, issue } = formData;
  
    const namePattern = /^[A-Z,a-z]+$/;
    const phonePattern = /^\+?\d{6,10}$/;
    const insurancePattern = /^\d{8}$/; // Pattern to match exactly 8 numbers
  
    if (!namePattern.test(firstName)) {
      toast.error("First name should contain only letters");
      return false;
    }
    if (!namePattern.test(lastName)) {
      toast.error("Last name should contain only letters");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!phonePattern.test(phone)) {
      toast.error("Phone number must be between 6 and 10 digits");
      return false;
    }
    if (!insurancePattern.test(insuranceNumber)) { // Check if insuranceNumber has exactly 8 numbers
      toast.error("Insurance Number must be exactly 8 numbers");
      return false;
    }
    if (!petName) {
      toast.error("Pet Name is required");
      return false;
    }
    if (!country) {
      toast.error("Country is required");
      return false;
    }
    if (!fullAddress) {
      toast.error("Full Address is required");
      return false;
    }
    if (!dob) {
      toast.error("Date of Birth for the Pet is required");
      return false;
    }
    if (!issue) {
      toast.error("Issue description is required");
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Get the user's email from localStorage
        const userEmail = localStorage.getItem('email');
  
        // Merge the user's email with the form data
        const formDataWithUserEmail = { ...formData, email: userEmail };
  
        // Send the merged data to the backend
        const response = await axios.post('http://localhost:4000/vet_claim', formDataWithUserEmail);
  
        console.log(response.data);
        toast.success("Your claim has been submitted to our veterinarian. You will be notified when you can chat.");
      } catch (error) {
        console.error('Error saving claim data:', error);
        toast.error("Failed to send your claim. Please try again later.");
      }
    }
  };


  return (
    <div className="main_container">
      <div className={styles.mainContainer}>
        <div className={styles.blurBackground}></div>
        <div className={styles.flexContainer}>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.h1}>Start your claim..</h1>
              <label className={styles.label} htmlFor="first-name">Name*</label>
              <div className={styles.nameFields}>
                <input 
                  type="text" 
                  id="first-name" 
                  name="firstName" 
                  placeholder="First Name" 
                  required 
                  aria-label="First Name" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input 
                  type="text" 
                  id="last-name" 
                  name="lastName" 
                  placeholder="Last Name" 
                  required 
                  aria-label="Last Name" 
                  value={formData.lastName}
                  onChange={handleInputChange}
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
                value={formData.email}
                onChange={handleInputChange}
              />

              <label className={styles.label} htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="+216" 
                required 
                aria-label="Phone Number" 
                value={formData.phone}
                onChange={handleInputChange}
              />

              <label className={styles.label} htmlFor="insurance-number">Insurance Number</label>
              <input 
                type="text" 
                id="insurance-number" 
                name="insuranceNumber" 
                placeholder="Insurance Number" 
                required 
                aria-label="Insurance Number" 
                value={formData.insuranceNumber}
                onChange={handleInputChange}
              />

              <label className={styles.label} htmlFor="pet-name">Pet Name</label>
              <input 
                type="text" 
                id="pet-name" 
                name="petName" 
                placeholder="Pet Name" 
                required 
                aria-label="Pet Name" 
                value={formData.petName}
                onChange={handleInputChange}
              /> 

<label className={styles.label} htmlFor="pet-gender">Pet Gender</label>
<select
  id="pet-gender"
  name="petGender"
  required
  aria-label="Pet Gender"
  value={formData.petGender}
  onChange={handleInputChange}
>
  <option value="" disabled>Select Pet Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>

              <label className={styles.label} htmlFor="dob">Date of Birth for the Pet</label>
              <input 
                type="date" 
                id="dob" 
                name="dob" 
                required 
                aria-label="Date of Birth for the Pet" 
                value={formData.dob}
                onChange={handleInputChange}
              />


              <label className={styles.label} htmlFor="country">Country</label>
              <select 
                id="country" 
                name="country" 
                required 
                aria-label="Country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select Country</option>
                <option value="Tunisia">Tunisia</option>
              </select>

              <label className={styles.label} htmlFor="full-address">Full Address</label>
              <input 
                type="text" 
                id="full-address" 
                name="fullAddress" 
                placeholder="Full Address" 
                required 
                aria-label="Full Address" 
                value={formData.fullAddress}
                onChange={handleInputChange}
              />

              <label className={styles.label} htmlFor="issue">Describe the Issue</label>
              <textarea 
                id="issue" 
                name="issue" 
                placeholder="Describe what is wrong with your pet" 
                required 
                aria-label="Describe the Issue" 
                rows="5"
                value={formData.issue}
                onChange={handleInputChange}
              ></textarea>

              <div className={styles.submitContainer}>
                <button type="submit" className={styles.submitButton}>Submit</button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

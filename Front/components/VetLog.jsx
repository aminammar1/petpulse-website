"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../Styles/VetLog.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const schema = Yup.object().shape({
  email: Yup.string().email("Must be a valid e-mail").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export default function VET_LOG() {
  const [formError, setFormError] = useState({});
  const [redirecting, setRedirecting] = useState(false); // State to control redirection
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/auth/login', data);
      console.log(response.data);

      localStorage.setItem('email', data.email);

      checkUserRole(data.email);
    } catch (error) {
      console.error('There is an error', error);
      toast.error('Login failed. Please try again.', { position: 'top-center' });
      setFormError(error.response?.data?.errors || {});
    }
  };

  const checkUserRole = async (email) => {
    try {
      const token = localStorage.getItem('authToken'); // Assuming you have an auth token stored
      const response = await axios.get(`http://localhost:4000/Vet_Login/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Add your auth token here
        }
      });
      const role = response.data.role;
      console.log('User role:', role); 
      
      if (role === 'vet') {
        router.push('/VetInterface');
      } else {
        toast.error('Login failed. You are not authorized to access this page.', { position: 'top-center' });
        setRedirecting(true);
      }
    } catch (error) {
      console.error('Failed to fetch user role', error);
      toast.error('Login failed. You are not authorized to access this page.', { position: 'top-center' });
    }
  };
  

  useEffect(() => {
    if (redirecting) {
      const timeout = setTimeout(() => {
        router.push('/');
      }, 2000); // 2000 milliseconds = 2 seconds
  
      // Clear the timeout if the component unmounts before the delay completes
      return () => clearTimeout(timeout);
    }
  }, [redirecting, router]);
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.blurBackground}></div>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <div className={styles.left}>
            <img className={styles.img} src="./image/17.png" alt="login" />
          </div>
          <div className={styles.right}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate="">
              <h2 className={styles.from_heading}>Vet Log in</h2>
              <input
                type="text"
                className={`${styles.input} ${formError.email ? styles.error : ''}`}
                placeholder="Email"
                {...register("email")}
              />
              <div className={styles.error_message}>{formError.email || errors.email?.message}</div>

              <div className="input-container">
                <input
                  type="password"
                  className={`${styles.input} ${formError.password ? styles.error : ''}`}
                  placeholder="Password"
                  {...register("password")}
                />
                <div className={styles.error_message}>{formError.password || errors.password?.message}</div>
              </div>

              <button className={styles.btn}>Log In</button>
            </form>
            <div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

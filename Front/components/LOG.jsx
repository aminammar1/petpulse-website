"use client";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../Styles/Login.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const schema = Yup.object().shape({
  email: Yup.string().email("Must be a valid e-mail").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const googleAuth = () => {
  window.open("http://localhost:4000/auth/google/callback", "_self");
};

export default function LOG() {
  const [formError, setFormError] = useState({});
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      router.push('/');
    }
  }, [router]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/auth/login', data);
      console.log(response.data);
      toast.success('Login successful!', { position: 'top-center' });

      // Store the email in localStorage
      localStorage.setItem('email', data.email);

      // Check for admin credentials
      if (data.email === 'Admin@gmail.com' && data.password === '123456789') {
        router.push('/Admin');
      } else {
        // Redirect to home page after 3 seconds
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    } catch (error) {
      console.error('There is an error', error);
      toast.error('Login failed. Please try again.', { position: 'top-center' });
      setFormError(error.response?.data?.errors || {});
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome!</h1>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./image/dog.jpg" alt="login" />
        </div>
        <div className={styles.right}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate="">
            <Link href="/Vet">
              <img src="./image/veterinarian.png" className={styles.Vet} alt="veterinarian" />
            </Link>
            <h2 className={styles.from_heading}>Members Log in</h2>
            <input
              type="email"
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
              <Link href="/ForgotPassword" className={styles.forgot_password_link}>Forgot Password?</Link>
            </div>

            <button className={styles.btn}>Log In</button>
          </form>
          <p className={styles.text}>or</p>
          <button className={styles.google_btn} onClick={googleAuth}>
            <img src="./image/google.png" alt="google icon" />
            <span>Sign in with Google</span>
          </button>
          <p className={styles.text}>New Here? <Link href="/signup">Sign Up</Link></p>
          <div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

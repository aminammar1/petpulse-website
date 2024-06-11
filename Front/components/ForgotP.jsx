"use client";
import Link from 'next/link';
import styles from "../Styles/ForgotPassword.module.css";
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const schema = Yup.object().shape({
  email: Yup.string().email("Must be a valid e-mail").required("Email is required"),
});

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/forgotPassword", data);
      console.log(response.data);
      toast.success('Email sent successfully!', { position: 'top-center' });

      // Navigate to alpha.jsx after 3 seconds
      setTimeout(() => {
        window.location.href = '/ResetPassword'; // Change the URL after 3 seconds
      }, 3000);
      
    } catch (error) {
      console.error("There is an error", error);
      toast.error('Invalid email address!', { position: 'top-center' });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Forgot Password?</h1>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./image/dog.jpg" alt="login" />
        </div>
        <div className={styles.right}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate="">
            <h2 className={styles.from_heading}>Type in your email</h2>
            <input type="email" className={styles.input} placeholder="Email" {...register("email")} />
            <div className={styles.error_message}>{errors.email && errors.email.message}</div>

            <button type="submit" className={styles.btn}>Next.</button> {/* Ensure it's type submit */}
          </form>
          <p className={styles.text}>
            New Here ? <Link href="/signup">Sign Up</Link>
          </p>
          <div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

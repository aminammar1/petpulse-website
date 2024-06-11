"use client";
import styles from "../Styles/ResetPassword.module.css";
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const schema = Yup.object().shape({
  email: Yup.string().email("Must be a valid e-mail").required("Email is required"),
  newPassword: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  resetCode: Yup.string().min(6, "Reset code must be at least 6 characters").required("Reset code is required"),
});

export default function ResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/resetPassword", data);
      console.log(response.data);
      toast.success('Password reset successfully!', { position: 'top-center' });
    } catch (error) {
      console.error("There is an error", error);
      toast.error('Error resetting password. Please try again.', { position: 'top-center' });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Reset Password!</h1>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./image/dog.jpg" alt="login" />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Create your new password</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate="">
            <input type="email" className={styles.input} placeholder="Email" {...register("email")} />
            <div className={styles.error_message}>{errors.email && errors.email.message}</div>
            <input type="password" className={styles.input} placeholder="Reset Code:" {...register("resetCode")} />
            <div className={styles.error_message}>{errors.resetCode && errors.resetCode.message}</div>
            <input type="password" className={styles.input} placeholder="New Password:" {...register("newPassword")} />
            <div className={styles.error_message}>{errors.newPassword && errors.newPassword.message}</div>
            <button className={styles.btn}>Reset</button>
          </form>
          <div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

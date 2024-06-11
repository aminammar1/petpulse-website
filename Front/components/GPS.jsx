"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import styles from "../Styles/chat.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Track_Location() {
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleTrackPet = async () => {
    if (!deviceId) {
      setMessage("Please enter a device ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:4000/C_DeviceId", {
        deviceId,
      });

      if (response.data.success) {
        setMessage("Device ID is valid. Tracking your pet...");
        // Navigate after 3 seconds
        setTimeout(() => {
          router.push("/map");
        }, 3000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("An error occurred while checking the device ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.joinChatContainer}>
        <h3>GPS</h3>
        <input
          type="text"
          placeholder="Device ID..."
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
        />
        <button onClick={handleTrackPet} disabled={loading}>
          {loading ? (
            <div className="loader"></div> // This is where you would put your loading animation component
          ) : (
            "Track Your Pet"
          )}
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

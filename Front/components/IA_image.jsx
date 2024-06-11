"use client"; // This directive tells Next.js that this is a Client Component

import React, { useState } from "react";
import axios from "axios";
import styles from "../Styles/IA.module.css";

export default function IA_Generator() {
  const [profileImage, setProfileImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:4000/Analiser",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          setAnalysisResult(response.data);
        } else {
          console.error("Error analyzing image:", response.statusText);
        }
      } catch (error) {
        console.error("Error analyzing image:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className={styles.profileContainer}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {profileImage && (
          <div className={styles.imageContainer}>
            <img
              src={profileImage}
              alt="Profile"
              className={styles.profileImage}
            />
          </div>
        )}
        {analysisResult && (
          <div className={styles.analysisResult}>
            <p>Emotion: {analysisResult.label}</p>
            <p>Confidence: {(analysisResult.score * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

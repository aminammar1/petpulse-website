"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "../Styles/VetInterface.module.css"; // Importing styles

export default function VetInterface() {
  const [claimData, setClaimData] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null); // To track the selected claim for displaying details
  const [selectedStatus, setSelectedStatus] = useState(""); // State to store the selected status
  const [isDeleted, setIsDeleted] = useState(false); // State to manage deletion success

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/Get_Vet_Claim");
        setClaimData(response.data.data);
      } catch (error) {
        console.error("Error fetching claim data:", error);
        toast.error("Failed to fetch claim data. Please try again.", {
          position: "top-center",
        });
      }
    }

    fetchData();
  }, []);

  const openModal = (claim) => {
    if (selectedClaim && selectedClaim._id === claim._id) {
      // If the clicked Claim ID is already selected, close the details
      setSelectedClaim(null);
    } else {
      // Otherwise, show the details of the clicked Claim ID
      setSelectedClaim(claim);
    }
  };

  const handleStatusSelection = (status) => {
    // Update the claim status here
    // You can send a request to your backend to update the claim status
    // and then update the claimData state with the updated data
    console.log(`Claim ${selectedClaim._id} status updated to ${status}`);
    setSelectedStatus(status);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  const handleDeleteClaim = (claimId) => {
    // Remove the claim ID from local storage
    localStorage.removeItem(claimId);
    // Update the claimData state to remove the deleted claim
    setClaimData(claimData.filter((claim) => claim._id !== claimId));
    toast.success("Claim deleted successfully.", { position: "top-center" });
  };

  const handleProfileClick = () => {
    window.location.href = "/user-profile"; // Navigate to the user profile page
  };

  return (
    <div className="main_container">
      <div className={styles.mainContainer}>
        <div className={styles.blurBackground}></div>
        <div className={styles.flexContainer}>
          <div className={styles.formContainer}>
            <div className={styles.form}>
              <div className={styles.header}>
                <h1 className={styles.h1}>Vet Interface</h1>
                <FontAwesomeIcon
                  icon={faUser}
                  className={styles.userIcon}
                  onClick={handleProfileClick}
                />
              </div>
              {isDeleted ? (
                <div>
                  <p>
                    Logged out successfully. Click the button below to return to
                    the home page.
                  </p>
                  <Link href="/">
                    <p className={styles.homeButton}>Go to Home</p>
                  </Link>
                </div>
              ) : (
                <div className={styles.claimDataContainer}>
                  <h2>Claim Data:</h2>
                  {claimData.map((claim, index) => (
                    <div key={index} className={styles.claimBox}>
                      <ClaimContainer
                        claim={claim}
                        isOpen={
                          selectedClaim && selectedClaim._id === claim._id
                        }
                        openModal={openModal}
                        handleStatusSelection={handleStatusSelection}
                        handleDeleteClaim={handleDeleteClaim} // Pass the delete handler
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleLogout}
                    className={`${styles.logoutButton} ${styles.greenButton}`} // Apply the green color
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

// Component to render each Claim ID and its details container
const ClaimContainer = ({
  claim,
  isOpen,
  openModal,
  handleStatusSelection,
  handleDeleteClaim,
}) => {
  return (
    <div
      className={`${styles.claimContainer} ${isOpen ? "" : styles.closed}`}
      onClick={() => openModal(claim)}
    >
      <strong>Claim ID:</strong> {claim._id}
      {isOpen && (
        <div className={styles.detailsContainer}>
          <p>
            <strong>Amount:</strong> {claim.amount}
          </p>
          <p>
            <strong>First Name:</strong> {claim.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {claim.lastName}
          </p>
          <p>
            <strong>Phone:</strong> {claim.phone}
          </p>
          <p>
            <strong>Pet Name:</strong> {claim.petName}
          </p>
          <p>
            <strong>Pet Gender:</strong> {claim.petGender}
          </p>
          <p>
            <strong>Date of Birth:</strong> {claim.dob}
          </p>
          <p>
            <strong>Country:</strong> {claim.country}
          </p>
          <p>
            <strong>Issue:</strong> {claim.issue}
          </p>
          <select
            value={claim.status || ""}
            onChange={(e) => handleStatusSelection(e.target.value)}
            className={styles.greenButton} // Apply the green color
          >
            <option value="">Select Status</option>
            <option value="waiting">Waiting</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => console.log("Create Chat for claim", claim._id)}
            className={`${styles.createChatButton} ${styles.greenButton}`} // Apply the green color
          >
            Create Chat
          </button>
        </div>
      )}
    </div>
  );
};

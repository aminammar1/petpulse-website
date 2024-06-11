"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../Styles/Map.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import L from "leaflet";

// Create custom icons with local src
const userIcon = new L.Icon({
  iconUrl: "./image/location.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const petIcon = new L.Icon({
  iconUrl: "./image/dog.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Tracker_Map = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [petPosition, setPetPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setPetPosition([latitude + 0.001, longitude + 0.001]); // Slightly offset pet position
        },
        (error) => {
          console.error("Error fetching location", error);
          toast.error(
            "Unable to fetch location. Please enable location services."
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (userPosition && petPosition) {
        // Simulate movement by slightly changing coordinates
        setUserPosition((prev) => [prev[0] + 0.0001, prev[1] + 0.0001]);
        setPetPosition((prev) => [prev[0] - 0.0001, prev[1] - 0.0001]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userPosition, petPosition]);

  if (!userPosition || !petPosition) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.blurBackground}></div>
      <div className={styles.flexContainer}>
        <div className={styles.cartItemsContainer}>
          <MapContainer center={userPosition} zoom={13} className={styles.map}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={userPosition} icon={userIcon}>
              <Popup>User Location</Popup>
            </Marker>
            <Marker position={petPosition} icon={petIcon}>
              <Popup>Pet Location</Popup>
            </Marker>
            <Polyline positions={[userPosition, petPosition]} color="blue" />
          </MapContainer>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Tracker_Map;

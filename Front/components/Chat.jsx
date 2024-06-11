"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import styles from "../Styles/chat.module.css";
import ChatM from "../components/ChatM";
import io from "socket.io-client"; // Import Socket.IO client library

const socket = io("http://localhost:4000");

export default function Home() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const joinRoom = async () => {
    try {
      await axios.post("http://localhost:4000/join_room", {
        email: email,
        roomId: room,
      });

      socket.emit("join_room", { email, roomId: room }); // Join the room on the client side

      // Fetch existing messages for the room
      const response = await axios.get(`http://localhost:4000/messages/${room}`);
      setMessages(response.data);

      setShowChat(true);
    } catch (error) {
      console.error("Error joining room:", error);
      // Handle error
    }
  };

  return (
    <div className={styles.App}>
      {!showChat ? (
        <div className={styles.joinChatContainer}>
          <h3>Join A Chat</h3>
          <p>Logged in as: {email}</p>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatM socket={socket} email={email} room={room} messages={messages} />
      )}
    </div>
  );
}

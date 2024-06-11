import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "../Styles/chating.module.css"; // Import the CSS module

function ChatM({ socket, email, room, messages }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState(messages);
  useEffect(() => {
    // Apply styles to the body element
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: email,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    // Clean up socket listener on unmount
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  return (
    <div className={styles.centeredWrapper}>
      <div className={styles.blurBackground}></div>
      <div className={styles.chat_wrapper}>
        <div className={styles.chat_window}>
          <div className={styles.chat_header}>
            <p>Vet Chat</p>
          </div>
          <div className={styles.chat_body}>
          <ScrollToBottom className={styles.message_container}>
  {messageList.map((messageContent, index) => {
    const isSentByUser = email === messageContent.author;
    const messageClass = isSentByUser ? styles.sentMessage : styles.receivedMessage;
    const backgroundColor = isSentByUser ? '#d1e7dd' : '#e1ffc7'; // Green for sent, Blue for received
    return (
      <div className={`${styles.message} ${messageClass}`} key={index}>
        <div>
          <div className={styles.message_content} style={{ backgroundColor }}>
            <p>{messageContent.message}</p>
          </div>
          {!isSentByUser && (
            <div className="message-meta">
              {/* No content here for received messages */}
            </div>
          )}
        </div>
      </div>
    );
  })}
</ScrollToBottom>

          </div>
          <div className={styles.chat_footer}>
            <input
              className={styles.chat_area}
              type="text"
              value={currentMessage}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatM;

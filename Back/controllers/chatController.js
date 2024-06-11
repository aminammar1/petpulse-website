// controllers/chatController.js
const { getDB } = require('../config/dbConn');

const getOrCreateChatRoom = async (room) => {
  const db = getDB();
  const collection = db.collection('chats');

  let chat = await collection.findOne({ room });

  if (!chat) {
    chat = { room, messages: [] };
    await collection.insertOne(chat);
  }

  return chat;
};

const addMessageToRoom = async (room, username, message) => {
  const db = getDB();
  const collection = db.collection('chats');

  await collection.updateOne(
    { room },
    { $push: { messages: { username, message, timestamp: new Date() } } }
  );
};

module.exports = { getOrCreateChatRoom, addMessageToRoom };

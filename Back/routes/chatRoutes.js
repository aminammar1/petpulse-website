// routes/chatRoutes.js
const { getOrCreateChatRoom } = require('../controllers/chatController');

async function chatRoutes(fastify, options) {
  fastify.get('/api/load-messages', async (req, reply) => {
    const { room } = req.query;
    try {
      const chat = await getOrCreateChatRoom(room);
      reply.send({ success: true, messages: chat.messages });
    } catch (error) {
      console.error("Error loading messages:", error);
      reply.send({ success: false, error: error.message });
    }
  });
}

module.exports = chatRoutes;

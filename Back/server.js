require("dotenv").config();
const fastify = require("fastify")();
const fastifyPassport = require("@fastify/passport");
const { connectDB, getClient } = require("./config/dbConn");
const fastifySecureSession = require("@fastify/secure-session");
const crypto = require("crypto");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const socketio = require("socket.io");
const cors = require("fastify-cors");

const PORT = process.env.PORT || 4000;

fastify.register(cors, {
  origin: ["http://localhost:3000"],
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    const key = crypto.randomBytes(32).toString("hex");
    fastify.register(fastifySecureSession, {
      key: Buffer.from(key, "hex"),
      cookie: {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      },
    });

    fastify.register(fastifyPassport.initialize());
    fastify.register(fastifyPassport.secureSession());

    fastifyPassport.use(
      "google",
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL:
            process.env.GOOGLE_CALLBACK_URL ||
            "http://localhost:4000/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, cb) {
          cb(null, profile);
        }
      )
    );

    fastifyPassport.registerUserDeserializer(async (user, req) => {
      return user;
    });

    fastifyPassport.registerUserSerializer(async (user, req) => {
      return user;
    });

    const io = socketio(fastify.server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("New connection:", socket.id);

      socket.on("join_room", (data) => {
        const { email, roomId } = data;
        socket.join(roomId);
        console.log(`${email} joined room ${roomId}`);

        // Acknowledge joining and emit back to the client who initiated
        io.to(socket.id).emit("join_room", { email, roomId });
      });

      socket.on("send_message", async (messageData) => {
        try {
          await storeMessage(messageData);
          io.to(messageData.room).emit("receive_message", messageData);
        } catch (error) {
          console.error("Error sending message:", error);
        }
      });
    });

    async function checkRoomExists(roomId) {
      try {
        const client = await getClient();
        const db = client.db();
        const chatCollection = db.collection("chat");

        // Check if room ID exists in the chat collection
        const roomExists = await chatCollection.findOne({ room: roomId });

        return roomExists;
      } catch (error) {
        console.error("Error checking room existence:", error);
        throw error;
      }
    }

    async function addRoomToChat(roomId) {
      try {
        const client = await getClient();
        const db = client.db();
        const chatCollection = db.collection("chat");

        // Insert new room into the chat collection
        await chatCollection.insertOne({ room: roomId });

        console.log(`Room ${roomId} added to chat collection.`);
      } catch (error) {
        console.error("Error adding room to chat collection:", error);
        throw error;
      }
    }

    async function storeMessage(messageData) {
      try {
        const client = await getClient();
        const db = client.db();
        const messagesCollection = db.collection("messages");

        await messagesCollection.insertOne(messageData);
      } catch (error) {
        console.error("Error storing message:", error);
        throw error;
      }
    }

    async function getMessagesByRoom(roomId) {
      try {
        const client = await getClient();
        const db = client.db();
        const messagesCollection = db.collection("messages");

        const messages = await messagesCollection
          .find({ room: roomId })
          .toArray();
        return messages;
      } catch (error) {
        console.error("Error retrieving messages:", error);
        throw error;
      }
    }

    fastify.post("/join_room", async (req, res) => {
      const { email, roomId } = req.body;
      console.log("Received roomId:", roomId); // Add this line for debugging

      try {
        // Check if room exists, if not, add it to the chat collection
        const roomExists = await checkRoomExists(roomId);
        if (!roomExists) {
          await addRoomToChat(roomId);
        }

        // Emit a socket event to join the room
        // Make sure to emit to the correct room ID
        io.to(roomId).emit("join_room", { email, roomId });

        res.send({ success: true });
      } catch (error) {
        console.error("Error joining room:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    fastify.get("/messages/:roomId", async (req, res) => {
      const { roomId } = req.params;

      try {
        const messages = await getMessagesByRoom(roomId);
        res.send(messages);
      } catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    fastify.get(
      "/auth/google/callback",
      {
        preValidation: fastifyPassport.authenticate("google", {
          scope: ["profile"],
        }),
      },
      async (req, res) => {
        res.redirect("/"); // Redirect after successful authentication
      }
    );

    fastify.get(
      "/login",
      fastifyPassport.authenticate("google", { scope: ["profile"] })
    );

    fastify.get("/logout", async (req, res) => {
      req.logout();
      return { success: true };
    });

    fastify.register(require("./routes/root"));
    fastify.register(require("./routes/authRoutes"));
    fastify.register(require("./routes/userRoutes"));

    fastify.listen(PORT, (err) => {
      if (err) {
        console.error("Error starting server:", err);
        process.exit(1);
      }
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

const { getClient } = require("../config/dbConn");

async function saveUserInfo(req, res) {
  try {
    // Destructure email and photo from the request body
    const { email, photo } = req.body;

    if (!email || !photo) {
      return res.status(400).send({ success: false, message: "Email and photo URL are required" });
    }

    const client = await getClient();
    const db = client.db();
    const userinfoCollection = db.collection("userinfo");

    // Create a new user info object
    const newUserInfo = { email, photo };

    // Insert the new user info into the database
    const result = await userinfoCollection.insertOne(newUserInfo);

    if (!result.acknowledged) {
      return res.status(500).send({ success: false, message: "Failed to save user information" });
    }

    return res.status(201).send({ success: true, message: "User information saved successfully" });
  } catch (error) {
    console.error("Error saving user information:", error);

    if (error.name === "MongoNetworkError") {
      return res.status(500).send({ success: false, message: "Database connection error", error });
    }

    return res.status(500).send({ success: false, message: "Failed to save user information", error });
  }
}

module.exports = { saveUserInfo };

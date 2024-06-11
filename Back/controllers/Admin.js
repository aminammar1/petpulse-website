const { getClient } = require("../config/dbConn");

async function A_page(req, res) {
  let client;
  try {
    const client = getClient();
    const db = client.db();
    const usersCollection = db.collection("users");

    // Retrieve all users from the collection
    const users = await usersCollection.find({}).toArray();

    if (users.length === 0) {
      return res.status(404).send({ success: false, message: "No users found" });
    }

    return res.status(200).send({ success: true, users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).send({ success: false, message: "An unexpected error occurred" });
  } finally {
    // Ensure the client is closed
    if (client) {
      await client.close();
    }
  }
}

module.exports = { A_page };

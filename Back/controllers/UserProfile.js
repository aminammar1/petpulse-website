const { getClient } = require("../config/dbConn");

async function getUserInfo(req, res) {
  try {
    // Get the email from the URL path parameters
    const email = req.params.email;

    if (!email) {
      return res.status(400).send({ success: false, message: "Email is required" });
    }

    const client = getClient();
    const db = client.db();
    const usersCollection = db.collection("users");

    // Retrieve user information from the database based on the email
    const user = await usersCollection.findOne({ email }, { projection: { firstName: 1, lastName: 1, email: 1 } });

    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    return res.status(200).send({ success: true, user });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return res.status(500).send({ success: false, message: "Failed to retrieve user data", error });
  }
}

module.exports = { getUserInfo };

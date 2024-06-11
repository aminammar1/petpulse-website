const { getClient } = require("../config/dbConn");

async function vetLogin(req, res) {
  try {
    // Get the email from the URL path parameters
    const email = req.params.email;

    if (!email) {
      return res.status(400).send({ success: false, message: "Email is required", role: null });
    }

    const client = getClient();
    const db = client.db();
    const usersCollection = db.collection("users");

    // Retrieve user information from the database based on the email
    const user = await usersCollection.findOne({ email }, { projection: { role: 1 } });

    if (!user) {
      return res.status(404).send({ success: false, message: "User not found", role: null });
    }

    // Check if the user role is either "vet" or "user"
    if (user.role == "vet") {
      return res.status(200).send({ success: true, message: "Access granted", role: user.role });

    }
    return res.status(403).send({ success: false, message: "Access denied", role: user.role });

    
    
  } catch (error) {
    console.error("Error checking user role:", error);
    return res.status(500).send({ success: false, message: "Failed to check user role", role: null, error });
  }
}

module.exports = { vetLogin };

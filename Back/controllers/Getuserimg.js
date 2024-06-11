const { getClient } = require("../config/dbConn");

async function getUserImage(req, res) {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).send({ success: false, message: "Email is required" });
    }

    const client = await getClient();
    const db = client.db();
    const userinfoCollection = db.collection("userinfo");

    // Retrieve user image from the database based on the email
    const user = await userinfoCollection.findOne(
      { email },
      { projection: { photo: 1 } }
    );

    if (!user || !user.photo) {
      return res.status(404).send({ success: false, message: "User image not found" });
    }

    return res.status(200).send({ success: true, photo: user.photo });
  } catch (error) {
    console.error("Error retrieving user image:", error);

    if (error.name === "MongoNetworkError") {
      return res.status(500).send({ success: false, message: "Database connection error", error });
    }

    return res.status(500).send({ success: false, message: "Failed to retrieve user image", error });
  }
}

module.exports = { getUserImage };

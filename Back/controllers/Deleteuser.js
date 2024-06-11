const { getClient } = require("../config/dbConn");

async function deleteUser(req, res) {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).send({ success: false, message: "Email is required" });
    }

    const client = await getClient();
    const db = client.db();
    const usersCollection = db.collection("users");
    const userinfoCollection = db.collection("userinfo");

    // Delete user from both collections
    const userDeleteResult = await usersCollection.deleteOne({ email });
    const userinfoDeleteResult = await userinfoCollection.deleteOne({ email });

    if (userDeleteResult.deletedCount === 0 && userinfoDeleteResult.deletedCount === 0) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    return res.status(200).send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);

    if (error.name === "MongoNetworkError") {
      return res.status(500).send({ success: false, message: "Database connection error", error });
    }

    return res.status(500).send({ success: false, message: "Failed to delete user", error });
  }
}

module.exports = { deleteUser };

const { getClient } = require("../config/dbConn");

async function saveReclamation(req, res) {
  try {
    const { email, message } = req.body;

    const client = await getClient();
    const db = client.db();
    const reclamationCollection = db.collection('reclamation');

    // Save reclamation data to the database
    await reclamationCollection.insertOne({
      email,
      message,
      timestamp: new Date() // Optionally, include a timestamp for when the data was saved
    });

    return res.status(200).send({ success: true, message: "Reclamation data saved successfully" });
  } catch (error) {
    console.error("Error saving reclamation data:", error);
    return res.status(500).send({ success: false, message: "Failed to save reclamation data", error });
  }
}

module.exports = { saveReclamation };

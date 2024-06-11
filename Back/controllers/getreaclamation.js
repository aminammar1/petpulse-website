const { getClient } = require("../config/dbConn");

async function getReclamations(req, res) {
  try {
    const client = await getClient();
    const db = client.db();
    const reclamationCollection = db.collection('reclamation');

    // Retrieve reclamation data from the database
    const reclamations = await reclamationCollection.find({}).toArray();

    return res.status(200).send({ success: true, data: reclamations });
  } catch (error) {
    console.error("Error getting reclamation data:", error);
    return res.status(500).send({ success: false, message: "Failed to get reclamation data", error });
  }
}

module.exports = { getReclamations };

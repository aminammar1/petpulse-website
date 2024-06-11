const { getClient } = require("../config/dbConn");

async function getAllClaimVetData(req, res) {
  try {
    const client = await getClient();
    const db = client.db();
    const claimVetCollection = db.collection("Claim_vet");

    // Retrieve all documents from the Claim_vet collection
    const claimVetData = await claimVetCollection.find().toArray();

    if (!claimVetData || claimVetData.length === 0) {
      return res.status(404).send({ success: false, message: "No data found in Claim_vet collection" });
    }

    return res.status(200).send({ success: true, data: claimVetData });
  } catch (error) {
    console.error("Error retrieving data from Claim_vet collection:", error);
    return res.status(500).send({ success: false, message: "Failed to retrieve data from Claim_vet collection", error });
  }
}

module.exports = { getAllClaimVetData };

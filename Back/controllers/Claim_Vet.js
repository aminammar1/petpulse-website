const { getClient } = require("../config/dbConn");

async function saveClaim(req, res) {
  try {
    const { firstName, lastName, email, phone, insuranceNumber, petName, petGender, dob, country, fullAddress, issue } = req.body;

    const client = await getClient();
    const db = client.db();
    const claimCollection = db.collection('Claim_vet');

    // Save claim data to the database
    await claimCollection.insertOne({
      firstName,
      lastName,
      email,
      phone,
      insuranceNumber,
      petName,
      petGender,
      dob,
      country,
      fullAddress,
      issue,
      timestamp: new Date() // Optionally, include a timestamp for when the data was saved
    });

    return res.status(200).send({ success: true, message: "Claim data saved successfully" });
  } catch (error) {
    console.error("Error saving claim data:", error);
    return res.status(500).send({ success: false, message: "Failed to save claim data", error });
  }
}

module.exports = { saveClaim };
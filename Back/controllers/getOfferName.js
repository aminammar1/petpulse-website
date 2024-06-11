const { getClient } = require("../config/dbConn");

async function getOfferName(req, res) {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).send({ success: false, message: "Email is required" });
    }

    const client = await getClient();
    const db = client.db();
    const offerCollection = db.collection("offer");

    // Retrieve the offer based on the email
    const offer = await offerCollection.findOne({ email }, { projection: { Offername: 1 } });

    if (!offer) {
      return res.status(404).send({ success: false, message: "Offer not found" });
    }

    return res.status(200).send({ success: true, offername: offer.Offername });
  } catch (error) {
    console.error("Error retrieving offer name:", error);
    return res.status(500).send({ success: false, message: "Failed to retrieve offer name", error });
  }
}

module.exports = { getOfferName };

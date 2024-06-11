const { getClient } = require("../config/dbConn");

async function checkDeviceId(req, res) {
  try {
    const { deviceId } = req.body;

    if (!deviceId) {
      return res.status(400).send({ success: false, message: "Device ID is required" });
    }

    const client = getClient();
    const db = client.db();
    const paymentCollection = db.collection("Payment");

    const device = await paymentCollection.findOne({ deviceId: parseInt(deviceId) });

    if (device) {
      return res.status(200).send({ success: true, message: "Device ID is valid" });
    } else {
      return res.status(404).send({ success: false, message: "Device ID not found" });
    }
  } catch (error) {
    console.error("Error checking device ID:", error);
    return res.status(500).send({ success: false, message: "Failed to check device ID", error });
  }
}

module.exports = { checkDeviceId };

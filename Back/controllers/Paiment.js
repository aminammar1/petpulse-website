const { getClient } = require("../config/dbConn");
const { sendConfirmationEmail } = require("./emailService");

function generateRandomDeviceId() {
  return Math.floor(1000000000 + Math.random() * 9000000000); // Generate a random 10-digit number
}

async function savePayment(req, res) {
  try {
    const {
      email,
      cardNumber,
      expirationDate,
      cvv,
      cardOwnerName,
      country,
      totalPrice,
    } = req.body;

    const deviceId = generateRandomDeviceId(); // Generate random numeric device ID

    const client = getClient();
    const db = client.db();
    const paymentCollection = db.collection("Payment");

    await paymentCollection.insertOne({
      email,
      cardNumber,
      expirationDate,
      cvv,
      cardOwnerName,
      country,
      totalPrice,
      deviceId,  // Save generated device ID
      timestamp: new Date(),
    });

    await sendConfirmationEmail(email, totalPrice, deviceId); // Send email with device ID

    return res.status(200).send({
      success: true,
      message: "Payment data saved and confirmation email sent successfully",
    });
  } catch (error) {
    console.error("Error saving payment data:", error);
    return res
      .status(500)
      .send({ success: false, message: "Failed to save payment data", error });
  }
}

module.exports = { savePayment };

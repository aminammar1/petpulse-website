const { getClient } = require('../config/dbConn');
const { sendInsuranceConfirmationEmail, generateInsuranceId } = require('./insuranceEmailService');

async function savePayment2(req, res) {
  try {
    const { email, cardNumber, expirationDate, cvv, cardOwnerName, country, totalPrice, Offername } = req.body;

    const client = getClient();
    const db = client.db();
    const paymentCollection = db.collection('offer');

    // Generate an insurance ID
    const insuranceId = generateInsuranceId();

    // Save payment data to the database
    await paymentCollection.insertOne({
      email,
      cardNumber,
      expirationDate,
      cvv,
      cardOwnerName,
      country,
      totalPrice,
      Offername, // Include offer name in the payment data
      insuranceId, // Include insurance ID in the payment data
      timestamp: new Date() // Optionally, include a timestamp for when the payment was made
    });

    // Send confirmation email
    await sendInsuranceConfirmationEmail(email, totalPrice, insuranceId, Offername);

    return res.status(200).send({ success: true, message: 'Payment data saved and confirmation email sent successfully' });
  } catch (error) {
    console.error('Error saving payment data:', error);
    return res.status(500).send({ success: false, message: 'Failed to save payment data', error });
  }
}

module.exports = { savePayment2 };
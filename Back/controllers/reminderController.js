const { getClient } = require("../config/dbConn");

async function saveReminder(req, res) {
  try {
    const { firstName, lastName, email, phone, renewalMonth, currentInsurance, country } = req.body;

    const client = await getClient();
    const db = client.db();
    const reminderCollection = db.collection('Reminder');

    // Save reminder data to the database
    await reminderCollection.insertOne({
      firstName,
      lastName,
      email,
      phone,
      renewalMonth,
      currentInsurance,
      country,
      timestamp: new Date() // Optionally, include a timestamp for when the data was saved
    });

    return res.status(200).send({ success: true, message: "Reminder data saved successfully" });
  } catch (error) {
    console.error("Error saving reminder data:", error);
    return res.status(500).send({ success: false, message: "Failed to save reminder data", error });
  }
}

module.exports = { saveReminder };

const { getClient } = require("../config/dbConn");

async function retrieveCartIems(req, res) {
  try {
    const client = getClient();
    const db = client.db();
    const cart = db.collection("cart");
    
    // Retrieve all items from the cart collection
    const items = await cart.find({}).toArray();

    // Return the items as a response
    return res.status(200).send({ success: true, items });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).send({ success: false, message: "Failed to fetch cart items", error });
  }
}

module.exports = { retrieveCartIems };
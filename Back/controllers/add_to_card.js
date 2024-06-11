const { getClient } = require("../config/dbConn");

async function addToCart(req, res) {
  try {
    const { itemName, quantity } = req.body;
    console.log(`Received itemName: ${itemName}, quantity: ${quantity}`);

    const client = getClient();
    const db = client.db();
    const cart = db.collection("cart");

    const itemsToAdd = Array.from({ length: quantity }, () => ({ itemName }));

    await cart.insertMany(itemsToAdd);

    return res
      .status(200)
      .send({ success: true, message: `${quantity} ${itemName}(s) added to cart successfully` });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res
      .status(500)
      .send({ success: false, message: "Failed to add item to cart", error });
  }
}

module.exports = { addToCart };

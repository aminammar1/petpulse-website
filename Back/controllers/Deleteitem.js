const { ObjectId } = require("mongodb");
const { getClient } = require("../config/dbConn");

async function deleteCartItem(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ success: false, message: "Invalid ID format" });
    }

    console.log("Deleting item with ID:", id);

    const client = getClient();
    const db = client.db();
    const cart = db.collection("cart");

    // Convert the ID to ObjectId
    const objectId = new ObjectId(id);

    // Delete the item by ID
    const result = await cart.deleteOne({ _id: objectId });

    console.log("Deletion result:", result);

    if (result.deletedCount > 0) {
      return res.status(200).send({ success: true, message: "Item deleted successfully" });
    } else {
      return res.status(404).send({ success: false, message: "Item not found" });
    }
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    return res.status(500).send({ success: false, message: "Failed to delete item from cart", error });
  }
}

module.exports = { deleteCartItem };

const { getClient } = require('../config/dbConn');

async function getCartItemsCount(req, res) {
  try {
    const client = getClient();
    const db = client.db();
    const cart = db.collection('cart');

    const count = await cart.countDocuments();

    return res.status(200).send({ count });
  } catch (error) {
    console.error('Error fetching cart items count:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

module.exports = { getCartItemsCount };

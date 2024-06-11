const authController = require("../controllers/authController");
const addToCart = require("../controllers/add_to_card");
const cartController = require("../controllers/cartController");
const Deleteitem = require("../controllers/Deleteitem");
const CartItemsCount = require("../controllers/CartItemsCount");
const savePayment = require("../controllers/Paiment");
const saveReminder = require("../controllers/reminderController");
const saveClaim = require("../controllers/Claim_Vet");
const savePayment2 = require("../controllers/Paiment2");
const getUserInfo = require("../controllers/UserProfile");
const saveUserInfo = require("../controllers/Userimg");
const getUserImage = require("../controllers/Getuserimg");
const deleteUser = require("../controllers/Deleteuser");
const getOfferName = require("../controllers/getOfferName");
const vetLogin = require("../controllers/vetLogin");
const getAllClaimVetData = require("../controllers/Get_claim_vet");
const A_page  = require("../controllers/Admin");
const saveReclamation = require("../controllers/reclamaùation");
const getReclamations = require("../controllers/getreaclamation");
const checkDeviceId = require("../controllers/deviceController");
const { analyzeImage } = require("../controllers/emotionController");

async function authRoutes(fastify, options) {
  fastify.register(require('@fastify/multipart'));

  fastify.post("/auth/register", authController.register);
  fastify.post("/auth/login", authController.login);
  fastify.get("/auth/refresh", authController.refresh);
  fastify.post("/auth/logout", authController.logout);
  fastify.post("/auth/forgotPassword", authController.forgotPassword);
  fastify.post("/auth/resetPassword", authController.resetPassword);
  fastify.post("/add_to_card", addToCart.addToCart);
  fastify.get("/cart_items", cartController.retrieveCartIems);
  fastify.delete("/cart_deleted/:id", Deleteitem.deleteCartItem);
  fastify.get("/CartItemsCount", CartItemsCount.getCartItemsCount);
  fastify.post("/save_payment", savePayment.savePayment);
  fastify.post("/save_reminder", saveReminder.saveReminder);
  fastify.post("/vet_claim", saveClaim.saveClaim);
  fastify.post("/save_payment2", savePayment2.savePayment2);
  fastify.get("/user_info/:email", getUserInfo.getUserInfo);
  fastify.post("/save_user_info", saveUserInfo.saveUserInfo);
  fastify.get('/user_image/:email', getUserImage.getUserImage);
  fastify.delete('/user/:email', deleteUser.deleteUser);
  fastify.get('/offer_name/:email', getOfferName.getOfferName);
  fastify.get("/Vet_Login/:email", vetLogin.vetLogin);
  fastify.get('/Get_Vet_Claim', getAllClaimVetData.getAllClaimVetData);
  fastify.post('/Admin_page', A_page.A_page);
  fastify.post('/Reclamation', saveReclamation.saveReclamation);
  fastify.get('/Get_R', getReclamations.getReclamations);
  fastify.post('/C_DeviceId', checkDeviceId.checkDeviceId);
  fastify.post("/Analiser", async (request, reply) => {
    const parts = request.parts();
    for await (const part of parts) {
      if (part.file) {
        const chunks = [];
        for await (const chunk of part.file) {
          chunks.push(chunk);
        }
        const imageBuffer = Buffer.concat(chunks);

        try {
          const response = await analyzeImage(imageBuffer);
          reply.send(response);
        } catch (error) {
          console.error("Error analyzing image:", error);
          reply.status(500).send({ error: error.message });
        }
      } else {
        reply.status(400).send({ error: "Image is required" });
      }
    }
  });
}

module.exports = authRoutes;

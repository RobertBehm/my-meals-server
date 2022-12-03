const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  deliverOrder,
} = require("../controllers/orderController");

router.post("/placeorder", placeOrder);
router.post("/getuserorders", getUserOrders);
router.get("/getallorders", getAllOrders);
router.post("/deliverorder", deliverOrder);

module.exports = router;

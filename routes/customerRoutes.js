const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
  addCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

router.get("/getallcustomers", getAllCustomers);
router.post("/addcustomer", addCustomer);
router.post("/deletecustomer", deleteCustomer);

module.exports = router;

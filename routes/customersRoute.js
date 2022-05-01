const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel");

router.get("/getallcustomers", async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.send(customers);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addcustomer", async (req, res) => {
  const customer = req.body.customer;

  try {
    const newcustomer = new Customer({
      name: customer.name,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      phone: customer.phone,
      foods: customer.foods,
      deliveryCharges: customer.deliveryCharges,
    });
    await newcustomer.save();
    res.send("New Customer Added Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deletecustomer", async (req, res) => {
  const customerid = req.body.customerid;

  try {
    await Customer.findOneAndDelete({ _id: customerid });
    res.send("Customer Deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;

module.exports = router;

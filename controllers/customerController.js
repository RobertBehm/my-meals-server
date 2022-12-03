const Customers = require("../models/Customers");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customers.find({});
    res.send(customers);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const addCustomer = async (req, res) => {
  const customer = req.body.customer;

  try {
    const newcustomer = new Customers({
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
};

const deleteCustomer = async (req, res) => {
  const customerid = req.body.customerid;

  try {
    await Customers.findOneAndDelete({ _id: customerid });
    res.send("Customer Deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = {
  getAllCustomers,
  addCustomer,
  deleteCustomer,
};

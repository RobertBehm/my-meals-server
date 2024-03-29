const Orders = require("../models/Orders");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51KOlUPGRMoSZxLCTmrvBM8TR0SuEQTRYxoI5xKfFlWxYrPmEsoIwtrzAc90j0m9pATJmHYEQnYc4bylTk9pStXlg00ZvpIRtoc"
);

const placeOrder = async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const neworder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      neworder.save();

      res.send("Order placed successfully");
    } else {
      res.send("Payment failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
};

const getUserOrders = async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Orders.find({ userid: userid }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deliverOrder = async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Orders.findOne({ _id: orderid });
    order.isDelivered = true;
    await order.save();
    res.send("Order Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  deliverOrder,
};

const Users = require("../models/Users");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new Users({ name, email, password });

  try {
    newUser.save();
    res.send("User Registered successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.find({ email, password });
    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };
      res.send(currentUser);
    } else {
      return res.status(400).json({ message: "User Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went weong" });
  }
};

const deleteUser = async (req, res) => {
  const userid = req.body.userid;

  try {
    await Users.findOneAndDelete({ _id: userid });
    res.send("User Deleted Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = {
  register,
  login,
  deleteUser,
  getAllUsers,
};

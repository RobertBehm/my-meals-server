const Meals = require("../models/Meals");

const getAllMeals = async (req, res) => {
  try {
    const meals = await Meals.find({});
    res.send(meals);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const addMeal = async (req, res) => {
  const meal = req.body.meal;

  try {
    const newmeal = new Meals({
      name: meal.name,
      image: meal.image,
      sizes: ["regular", "large"],
      description: meal.description,
      category: meal.category,
      prices: [meal.prices],
    });
    await newmeal.save();
    res.send("New Meal Added Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const getMealById = async (req, res) => {
  const mealid = req.body.mealid;

  try {
    const meal = await Meal.findOne({ _id: mealid });
    res.send(meal);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const editMeal = async (req, res) => {
  const editedmeal = req.body.editedmeal;

  try {
    const meal = await Meals.findOne({ _id: editedmeal._id });

    (meal.name = editedmeal.name),
      (meal.description = editedmeal.description),
      (meal.image = editedmeal.image),
      (meal.category = editedmeal.category),
      (meal.prices = [editedmeal.prices]);

    await meal.save();

    res.send("Meal Details Edited successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deleteMeal = async (req, res) => {
  const mealid = req.body.mealid;

  try {
    await Meals.findOneAndDelete({ _id: mealid });
    res.send("Meal Deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = {
  getAllMeals,
  addMeal,
  getMealById,
  editMeal,
  deleteMeal,
};

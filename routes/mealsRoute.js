const express = require("express");
const router = express.Router();
const Meal = require("../models/mealModel");

router.get("/getallmeals", async (req, res) => {
  try {
    const meals = await Meal.find({});
    res.send(meals);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addmeal", async (req, res) => {
  const meal = req.body.meal;

  try {
    const newmeal = new Meal({
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
});

router.post("/getmealbyid", async (req, res) => {
  const mealid = req.body.mealid;

  try {
    const meal = await Meal.findOne({ _id: mealid });
    res.send(meal);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/editmeal", async (req, res) => {
  const editedmeal = req.body.editedmeal;

  try {
    const meal = await Meal.findOne({ _id: editedmeal._id });

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
});

router.post("/deletemeal", async (req, res) => {
  const mealid = req.body.mealid;

  try {
    await Meal.findOneAndDelete({ _id: mealid });
    res.send("Meal Deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;

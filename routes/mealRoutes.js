const express = require("express");
const router = express.Router();

const {
  getAllMeals,
  addMeal,
  getMealById,
  editMeal,
  deleteMeal,
} = require("../controllers/mealController");

router.get("/getallmeals", getAllMeals);
router.post("/addmeal", addMeal);
router.post("/getmealbyid", getMealById);
router.post("/editmeal", editMeal);
router.post("/deletemeal", deleteMeal);

module.exports = router;

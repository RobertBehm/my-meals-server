const mongoose = require("mongoose");

const mealSchema = mongoose.Schema(
  {
    name: { type: String, require },
    sizes: [],
    prices: [],
    category: { type: String, require },
    image: { type: String, require },
    description: { type: String, require },
  },
  {
    timestamps: true,
  }
);

const mealModel = mongoose.model("meals", mealSchema);

module.exports = mealModel;

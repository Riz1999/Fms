// models/UserFoodSelection.js
const mongoose = require("mongoose");

const userFoodSelectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model,
    
  },
  selectedDay: {
    type: String,
    required: true,
  },
  selectedMonth:{
    type: String,
    required: true,
  },
  selectedWeek:{
    type: Number,
    required: true,
  },
  breakfast: {
    type: Array,
    required: true,
  },
  lunch: {
    type : Array,
    require: true
  },
  dinner: {
    type : Array,
    require : true,
  },

});

const UserFoodSelection = mongoose.model(
  "UserFoodSelection",
  userFoodSelectionSchema
);

module.exports = UserFoodSelection;

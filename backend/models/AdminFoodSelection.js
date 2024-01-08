// models/UserFoodSelection.js
const mongoose = require("mongoose");

const adminFoodSelectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model,
    
  },
  selectedDay: {
    type: String,
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

const AdminFoodSelection = mongoose.model(
  "adminFoodSelection",
  adminFoodSelectionSchema
);
console.log('from adminFoodSelection : '+AdminFoodSelection);
module.exports = AdminFoodSelection;

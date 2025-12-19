const mongoose = require("mongoose");

const debtSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  personName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ["GIVEN", "TAKEN"],
    required: true
  },
  status: {
    type: String,
    enum: ["PENDING", "PAID"],
    default: "PENDING"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Debt", debtSchema);
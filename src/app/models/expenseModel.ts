import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema({
  paidTo: {
    type: String,
    required: [true, "Paid Is Requirement Field"],
  },
  by: {
    type: String,
    required: [true, "From Whom Is Requirement Field"],
  },

  desc: {
    type: String,
    required: [true, "Description is Important"],
  },
  amount: {
    type: Number,
    required: [true, "Amount Can't be Null"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;

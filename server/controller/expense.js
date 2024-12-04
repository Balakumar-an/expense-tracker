const Expense = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const expense = new Expense({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !amount || !category || !description || !date)
      return res.status(400).json({ message: "All fields are mandatory!" });

    if (amount < 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount should be positive number" });
    }

    await expense.save();
    return res.status(200).json({ message: "Expense added successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  Expense.findByIdAndDelete(id)
    .then(() =>
      res.status(200).json({ message: "Expense deleted successfully." })
    )
    .catch(() => res.status(500).json({ message: "Server Error" }));
};

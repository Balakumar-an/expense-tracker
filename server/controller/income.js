const Income = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const income = new Income({
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

    await income.save();
    return res.status(200).json({ message: "Income added successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  Income.findByIdAndDelete(id)
    .then(() =>
      res.status(200).json({ message: "Income deleted successfully." })
    )
    .catch(() => res.status(500).json({ message: "Server Error" }));
};

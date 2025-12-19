const express = require("express");
const Debt = require("../models/Debt");
const auth = require("../middleware/auth");

const router = express.Router();

// ADD DEBT
router.post("/add", auth, async (req, res) => {
  try {
    const { personName, amount, type } = req.body;

    const debt = new Debt({
      userId: req.user,
      personName,
      amount,
      type
    });

    await debt.save();
    res.json({ msg: "Debt added successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET MY DEBTS
router.get("/my", auth, async (req, res) => {
  const debts = await Debt.find({ userId: req.user }).sort({ date: -1 });
  res.json(debts);
});

// MARK AS PAID
router.put("/paid/:id", auth, async (req, res) => {
  await Debt.findByIdAndUpdate(req.params.id, { status: "PAID" });
  res.json({ msg: "Marked as PAID" });
});

// DELETE DEBT
router.delete("/:id", auth, async (req, res) => {
  await Debt.findByIdAndDelete(req.params.id);
  res.json({ msg: "Debt deleted" });
});

module.exports = router;

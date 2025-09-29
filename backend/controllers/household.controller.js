const Household = require("../models/Household");

const createHousehold = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "Household name required" });

    const household = await Household.create({ name, owner: req.user.id });
    res.status(201).json(household);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getHouseholds = async (req, res) => {
  try {
    const households = await Household.find({ owner: req.user.id });
    res.json(households);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getHouseholdById = async (req, res) => {
  try {
    const household = await Household.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!household)
      return res.status(404).json({ message: "Household not found" });
    res.json(household);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateHousehold = async (req, res) => {
  try {
    const household = await Household.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!household)
      return res.status(404).json({ message: "Household not found" });
    res.json(household);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteHousehold = async (req, res) => {
  try {
    const household = await Household.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!household)
      return res.status(404).json({ message: "Household not found" });
    res.json({ message: "Household deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createHousehold,
  getHouseholds,
  getHouseholdById,
  updateHousehold,
  deleteHousehold,
};

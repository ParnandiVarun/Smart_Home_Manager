const express = require("express");
const router = express.Router();
const Routine = require("../models/Routine");
const Device = require("../models/Device");

router.post("/", async (req, res) => {
  try {
    const routine = new Routine(req.body);
    await routine.save();
    res.json(routine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:householdId", async (req, res) => {
  const routines = await Routine.find({
    household: req.params.householdId,
  }).populate("actions.device");
  res.json(routines);
});

router.post("/:id/trigger", async (req, res) => {
  const routine = await Routine.findById(req.params.id).populate(
    "actions.device"
  );
  if (!routine) return res.status(404).json({ error: "Routine not found" });

  for (const action of routine.actions) {
    await Device.findByIdAndUpdate(action.device._id, {
      status: action.status,
    });
  }

  res.json({ message: `Routine '${routine.name}' executed` });
});

module.exports = router;

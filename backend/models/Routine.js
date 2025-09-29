const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema(
  {
    household: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Household",
      required: true,
    },
    name: { type: String, required: true },
    time: { type: String, required: true }, // e.g. "22:00"
    actions: [
      {
        device: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
        status: { type: String, enum: ["On", "Off"], required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Routine", routineSchema);

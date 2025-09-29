import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["lamp", "fan", "thermostat", "ac", "custom"],
    },
    status: {
      type: String,
      enum: ["on", "off", "standby", "malfunction"],
      default: "off",
    },
    settings: { type: Object, default: {} },
    connected: { type: Boolean, default: false },
    energyUsed: { type: Number, default: 0 },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Device", deviceSchema);

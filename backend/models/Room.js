import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    household: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Household",
      required: true,
    },
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);

import Device from "../models/Device.js";
import cron from "node-cron";

export const startEnergySimulator = () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const devices = await Device.find({ status: "on" });
      for (let device of devices) {
        device.energyUsed += 0.1;
        await device.save();
      }
      console.log("Energy usage updated");
    } catch (err) {
      console.error("Energy simulator error:", err.message);
    }
  });
};

const Household = require("../models/Household");
const Room = require("../models/Room");
const Device = require("../models/Device");

exports.getHouseholdOverview = async (req, res) => {
  try {
    const { householdId } = req.params;

    const household = await Household.findOne({
      _id: householdId,
      user: req.user._id,
    });

    if (!household) {
      return res.status(404).json({ message: "Household not found" });
    }

    const rooms = await Room.find({ household: householdId }).lean();

    const roomsWithDevices = await Promise.all(
      rooms.map(async (room) => {
        const devices = await Device.find({ room: room._id }).lean();
        return { ...room, devices };
      })
    );

    res.json({
      household: household.name,
      rooms: roomsWithDevices,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching overview", error: err.message });
  }
};

const Room = require("../models/Room");

const Household = require("../models/Household");

const createRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const { householdId } = req.params;

    if (!name) return res.status(400).json({ message: "Room name required" });

    const household = await Household.findOne({
      _id: householdId,
      owner: req.user.id,
    });
    if (!household)
      return res.status(404).json({ message: "Household not found" });

    const room = await Room.create({ name, household: householdId });

    household.rooms.push(room._id);
    await household.save();

    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const household = await Household.findOne({
      _id: room.household,
      owner: req.user.id,
    });
    if (!household) return res.status(403).json({ message: "Not authorized" });

    Object.assign(room, req.body);
    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });
    const household = await Household.findOne({
      _id: room.household,
      owner: req.user.id,
    });
    if (!household) return res.status(403).json({ message: "Not authorized" });

    await Room.deleteOne({ _id: roomId });
    household.rooms.pull(roomId);
    await household.save();

    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

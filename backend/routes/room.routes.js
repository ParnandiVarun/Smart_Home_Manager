const express = require("express");
const { protect } = require("../middlewares/auth.middleware.js");

const {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} = require("../controllers/room.controller.js");

const router = express.Router({ mergeParams: true }); // merge householdId param

router.use(protect);

router.post("/:householdId/rooms", createRoom);
router.get("/:householdId/rooms", getRooms);

router.put("/rooms/:roomId", updateRoom);
router.delete("/rooms/:roomId", deleteRoom);

module.exports = router;

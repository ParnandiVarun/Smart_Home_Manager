const express = require("express");
const { protect } = require("../middlewares/auth.middleware.js");
const {
  createHousehold,
  getHouseholds,
  getHouseholdById,
  updateHousehold,
  deleteHousehold,
} = require("../controllers/household.controller.js");

const router = express.Router();

router.use(protect);

router.post("/", createHousehold);
router.get("/", getHouseholds);
router.get("/:id", getHouseholdById);
router.put("/:id", updateHousehold);
router.delete("/:id", deleteHousehold);

module.exports = router;

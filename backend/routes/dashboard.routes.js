const express = require("express");
const router = express.Router();
const { getHouseholdOverview } = require("../controllers/dashboard.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/:householdId/overview", protect, getHouseholdOverview);

module.exports = router;

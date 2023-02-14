const express = require("express");
const router = express.Router();
const {
  createKPIData,
  getKPIDatas,
  getKPIData,
  deleteKPIData,
  updateKPIData,
} = require("../controllers/pocKPIController");

const userAuth = require("../middlewares/userAuth");

// require auth for all kpi data routes
router.use(userAuth);

//Get all kpi datas
router.get("/", getKPIDatas);

//Get a single kpi data
router.get("/:id", getKPIData);

//Create a new kpi data
router.post("/", createKPIData);

//Delete a single kpi data
router.delete("/:id", deleteKPIData);

//Update a single kpi data
router.patch("/:id", updateKPIData);

module.exports = router;

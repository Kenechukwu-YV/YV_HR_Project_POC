const express = require("express");
const router = express.Router();
const {
  createEmployeeData,
  getEmployeeDatas,
  getEmployeeData,
  deleteEmployeeData,
  updateEmployeeData,
} = require("../controllers/pocEmployeeController");

const userAuth = require("../middlewares/userAuth");

// require auth for all employee data routes
router.use(userAuth);

//Get all employee datas
router.get("/", getEmployeeDatas);

//Get a single employee data
router.get("/:id", getEmployeeData);

//Create a new employee data
router.post("/", createEmployeeData);

//Delete a single employee data
router.delete("/:id", deleteEmployeeData);

//Update a single employee data
router.patch("/:id", updateEmployeeData);

module.exports = router;

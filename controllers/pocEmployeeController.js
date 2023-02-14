const EmployeeData = require("../models/pocEmployeeModel");
const mongoose = require("mongoose");

//GET all employeedatas
const getEmployeeDatas = async (req, res) => {
  const user_id = req.user._id;
  try {
    const employeedatas = await EmployeeData.find({ user_id }).sort({
      createdAt: -1,
    }); //Listing the database in descending order (Newest at the top)
    res.status(200).json(employeedatas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a employeedata
const getEmployeeData = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not a valid MongoDB ID" });
    }
    const employeedata = await EmployeeData.findById(id);
    if (!employeedata) {
      return res.status(404).json({ error: "No such employeedata" });
    }
    res.status(200).json(employeedata);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//CREATE a employeedata
const createEmployeeData = async (req, res) => {
  const { firstname, lastname, department, level, role, age } = req.body;
  //Making a more friendly error message, due to omitting mandatory field upon submission of new employeedata
  let emptyFields = [];

  if (!firstname) {
    emptyFields.push("title");
  }
  if (!lastname) {
    emptyFields.push("load");
  }
  if (!department) {
    emptyFields.push("reps");
  }
  if (!level) {
    emptyFields.push("reps");
  }
  if (!role) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }
  //add doc to db
  try {
    const user_id = req.user._id;
    const employeedata = await EmployeeData.create({
      firstname,
      lastname,
      department,
      level,
      role,
      age,
      user_id,
    });
    res.status(200).json(employeedata);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a employeedata
const deleteEmployeeData = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not a valid MongoDB ID" });
    }
    const employeedata = await EmployeeData.findOneAndDelete({ _id: id });
    if (!employeedata) {
      return res.status(404).json({ error: "No such employeedata" });
    }
    res.status(200).json(employeedata);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//UPDATE a employeedata
const updateEmployeeData = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not a valid MongoDB ID" });
    }
    const employeedata = await EmployeeData.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!employeedata) {
      return res.status(404).json({ error: "No such employeedata" });
    }
    res.status(200).json(employeedata);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createEmployeeData,
  getEmployeeDatas,
  getEmployeeData,
  deleteEmployeeData,
  updateEmployeeData,
};

const KPIData = require("../models/pocKPIModel");
const mongoose = require("mongoose");

//GET all kpidatas
const getKPIDatas = async (req, res) => {
  const user_id = req.user._id;
  try {
    const kpidatas = await KPIData.find({ user_id }).sort({
      createdAt: -1,
    }); //Listing the database in descending order (Newest at the top)
    res.status(200).json(KPIdatas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a KPIdata
const getKPIData = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not a valid MongoDB ID" });
    }
    const kpidata = await KPIData.findById(id);
    if (!kpidata) {
      return res.status(404).json({ error: "No such kpidata" });
    }
    res.status(200).json(kpidata);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//CREATE a kpidata
const createKPIData = async (req, res) => {
  const { task, score, overallscore } = req.body;
  //Making a more friendly error message, due to omitting mandatory field upon submission of new kpidata
  let emptyFields = [];

  if (!task) {
    emptyFields.push("task");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }
  //add doc to db
  try {
    const user_id = req.user._id;
    const kpidata = await KPIData.create({
      task,
      score,
      overallscore,
      user_id,
    });
    res.status(200).json(kpidata);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a kpidata
const deleteKPIData = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not a valid MongoDB ID" });
    }
    const kpidata = await KPIData.findOneAndDelete({ _id: id });
    if (!kpidata) {
      return res.status(404).json({ error: "No such kpidata" });
    }
    res.status(200).json(kpidata);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//UPDATE a kpidata
const updateKPIData = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not a valid MongoDB ID" });
    }
    const kpidata = await KPIData.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!kpidata) {
      return res.status(404).json({ error: "No such kpidata" });
    }
    res.status(200).json(kpidata);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createKPIData,
  getKPIDatas,
  getKPIData,
  deleteKPIData,
  updateKPIData,
};

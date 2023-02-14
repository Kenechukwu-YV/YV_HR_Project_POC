const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const KPISchema = new Schema(
  {
    kpi: {
      task: {
        type: String,
        required: true,
        trim: true,
      },
      overallscore: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) throw new Error("Negative scores aren't allowed.");
        },
      },
      score: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) throw new Error("Negative scores aren't allowed.");
        },
      },
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("kpi", KPISchema);

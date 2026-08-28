const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    semester: {
      type: String,
      required: true,
      trim: true,
    },

    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    grade: {
      type: String,
      required: true,
      trim: true,
    },

    gradePoint: {
      type: Number,
      required: true,
      min: 0,
      max: 4,
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate result for same student, course and semester
resultSchema.index(
  { student: 1, course: 1, semester: 1 },
  { unique: true }
);

module.exports = mongoose.model("Result", resultSchema);
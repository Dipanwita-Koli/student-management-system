const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    credit: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    semester: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
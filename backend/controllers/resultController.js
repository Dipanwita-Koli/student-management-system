const Result = require("../models/Result");

// Create Result
const createResult = async (req, res) => {
  try {
    const {
      student,
      course,
      semester,
      marks,
      grade,
      gradePoint,
      remarks,
    } = req.body;

    if (
      !student ||
      !course ||
      !semester ||
      marks === undefined ||
      !grade ||
      gradePoint === undefined
    ) {
      return res.status(400).json({
        message:
          "Student, course, semester, marks, grade and grade point are required",
      });
    }

    const existingResult = await Result.findOne({
      student,
      course,
      semester,
    });

    if (existingResult) {
      return res.status(400).json({
        message: "Result already exists for this student and course",
      });
    }

    const result = await Result.create({
      student,
      course,
      semester,
      marks,
      grade,
      gradePoint,
      remarks,
    });

    res.status(201).json({
      message: "Result created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all results
const getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("student", "studentId name email")
      .populate("course", "courseCode courseName credit");

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get single result
const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("student", "studentId name email")
      .populate("course", "courseCode courseName credit");

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createResult,
  getResults,
  getResultById,
};
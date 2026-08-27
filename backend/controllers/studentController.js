const Student = require("../models/Student");

// Create Student
const createStudent = async (req, res) => {
  try {
    const {
      user,
      studentId,
      name,
      email,
      phone,
      department,
      semester,
      session,
    } = req.body;

    if (
      !user ||
      !studentId ||
      !name ||
      !email ||
      !department ||
      !semester ||
      !session
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const existingStudent = await Student.findOne({
      $or: [{ studentId }, { email }, { user }],
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }

    const student = await Student.create({
      user,
      studentId,
      name,
      email,
      phone,
      department,
      semester,
      session,
    });

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("user", "name email role")
      .populate("department", "name code");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get single student
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("user", "name email role")
      .populate("department", "name code");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
};
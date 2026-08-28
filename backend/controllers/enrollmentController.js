const Enrollment = require("../models/Enrollment");

// Create Enrollment
const createEnrollment = async (req, res) => {
  try {
    const { student, course, semester } = req.body;

    if (!student || !course || !semester) {
      return res.status(400).json({
        message: "Student, course and semester are required",
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      student,
      course,
      semester,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        message: "Student is already enrolled in this course",
      });
    }

    const enrollment = await Enrollment.create({
      student,
      course,
      semester,
    });

    res.status(201).json({
      message: "Enrollment created successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all enrollments
const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "studentId name email department")
      .populate("course", "courseCode courseName credit semester");

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get single enrollment
const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate("student", "studentId name email department")
      .populate("course", "courseCode courseName credit semester");

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
};
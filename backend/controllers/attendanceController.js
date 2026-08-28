const Attendance = require("../models/Attendance");

// Create Attendance
const createAttendance = async (req, res) => {
  try {
    const { student, course, date, status, remarks } = req.body;

    if (!student || !course || !date || !status) {
      return res.status(400).json({
        message: "Student, course, date and status are required",
      });
    }

    const existingAttendance = await Attendance.findOne({
      student,
      course,
      date,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already exists for this student on this date",
      });
    }

    const attendance = await Attendance.create({
      student,
      course,
      date,
      status,
      remarks,
    });

    res.status(201).json({
      message: "Attendance created successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all attendance records
const getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find()
      .populate("student", "studentId name email")
      .populate("course", "courseCode courseName credit");

    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get single attendance record
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate("student", "studentId name email")
      .populate("course", "courseCode courseName credit");

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createAttendance,
  getAttendances,
  getAttendanceById,
};
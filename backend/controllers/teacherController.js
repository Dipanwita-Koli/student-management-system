const Teacher = require("../models/Teacher");

// Create Teacher
const createTeacher = async (req, res) => {
  try {
    const {
      user,
      teacherId,
      name,
      email,
      phone,
      department,
      designation,
      specialization,
    } = req.body;

    if (
      !user ||
      !teacherId ||
      !name ||
      !email ||
      !department ||
      !designation
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const existingTeacher = await Teacher.findOne({
      $or: [{ teacherId }, { email }, { user }],
    });

    if (existingTeacher) {
      return res.status(400).json({
        message: "Teacher already exists",
      });
    }

    const teacher = await Teacher.create({
      user,
      teacherId,
      name,
      email,
      phone,
      department,
      designation,
      specialization,
    });

    res.status(201).json({
      message: "Teacher created successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("user", "name email role")
      .populate("department", "name code");

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get single teacher
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("user", "name email role")
      .populate("department", "name code");

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update Teacher
const updateTeacher = async (req, res) => {
  try {
    const {
      teacherId,
      name,
      email,
      phone,
      department,
      designation,
      specialization,
    } = req.body;

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    if (teacherId) teacher.teacherId = teacherId;
    if (name) teacher.name = name;
    if (email) teacher.email = email;
    if (phone) teacher.phone = phone;
    if (department) teacher.department = department;
    if (designation) teacher.designation = designation;
    if (specialization) teacher.specialization = specialization;

    await teacher.save();

    res.status(200).json({
      message: "Teacher updated successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    await Teacher.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
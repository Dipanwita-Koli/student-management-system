const Course = require("../models/Course");

// Create Course
const createCourse = async (req, res) => {
  try {
    const {
      courseCode,
      courseName,
      credit,
      department,
      teacher,
      semester,
    } = req.body;

    if (
      !courseCode ||
      !courseName ||
      !credit ||
      !department ||
      !teacher ||
      !semester
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const existingCourse = await Course.findOne({ courseCode });

    if (existingCourse) {
      return res.status(400).json({
        message: "Course already exists with this course code",
      });
    }

    const course = await Course.create({
      courseCode,
      courseName,
      credit,
      department,
      teacher,
      semester,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("department", "name code")
      .populate("teacher", "teacherId name email designation");

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get single course
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("department", "name code")
      .populate("teacher", "teacherId name email designation");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    const {
      courseCode,
      courseName,
      credit,
      department,
      teacher,
      semester,
    } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (courseCode) course.courseCode = courseCode;
    if (courseName) course.courseName = courseName;
    if (credit) course.credit = credit;
    if (department) course.department = department;
    if (teacher) course.teacher = teacher;
    if (semester) course.semester = semester;

    await course.save();

    res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
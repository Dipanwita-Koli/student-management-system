const Department = require("../models/Department");

const createDepartment = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        message: "Name and code are required",
      });
    }

    const existingDepartment = await Department.findOne({
      $or: [{ name }, { code }],
    });

    if (existingDepartment) {
      return res.status(400).json({
        message: "Department already exists",
      });
    }

    const department = await Department.create({
      name,
      code,
    });

    res.status(201).json({
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createDepartment,
  getDepartments,
};
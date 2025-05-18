const Employee = require('../models/Employee');

// GET: Retrieve all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees: ' + err.message });
  }
};

// POST: Add a new employee
const addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ 
      errors: err.errors 
        ? Object.values(err.errors).map(e => e.message) 
        : [err.message] 
    });
  }
};

// PUT: Update an employee by ID
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findOneAndUpdate(
      { id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: `Employee with ID ${id} not found` });
    }
    res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (err) {
    res.status(400).json({ 
      errors: err.errors 
        ? Object.values(err.errors).map(e => e.message) 
        : [err.message] 
    });
  }
};

// DELETE: Remove an employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: `Employee with ID ${id} not found` });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: `Failed to delete employee: ${err.message}` });
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
};
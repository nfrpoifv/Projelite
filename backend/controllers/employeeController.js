const Employee = require('../models/employeeModel');

async function createEmployee(req, res) {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function listEmployees(req, res) {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getEmployee(req, res) {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateEmployee(req, res) {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        await employee.update(req.body);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteEmployee(req, res) {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        await employee.destroy();
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createEmployee,
    listEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
};

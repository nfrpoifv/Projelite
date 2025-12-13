const bcrypt = require('bcryptjs');
const Employee = require('../models/employeeModel');

async function createEmployee(req, res) {
    try {
        const { email, password, name, lastName, role } = req.body;

        const existingEmployee = await Employee.findOne({ where: { Email: email } });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = await Employee.create({
            Email: email,
            password: hashedPassword,
            name,
            lastName,
            role,
            idUser: req.user.userId 
        });

        const { password: _, ...employeeData } = employee.toJSON();
        res.status(201).json(employeeData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function listEmployees(req, res) {
    try {
        const employees = await Employee.findAll({
            where: { idUser: req.user.userId },  
            attributes: { exclude: ['password'] }
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getEmployee(req, res) {
    try {
        const employee = await Employee.findOne({
            where: { 
                employeeId: req.params.id,
                idUser: req.user.userId  
            },
            attributes: { exclude: ['password'] }
        });
        
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateEmployee(req, res) {
    try {
        const employee = await Employee.findOne({
            where: { 
                employeeId: req.params.id,
                idUser: req.user.userId  
            }
        });
        
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        delete req.body.idUser;  
        await employee.update(req.body);
        
        const { password: _, ...employeeData } = employee.toJSON();
        res.json(employeeData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteEmployee(req, res) {
    try {
        const employee = await Employee.findOne({
            where: { 
                employeeId: req.params.id,
                idUser: req.user.userId  
            }
        });
        
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

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
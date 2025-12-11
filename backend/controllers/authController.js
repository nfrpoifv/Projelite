const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Employee = require('../models/employeeModel');

async function registerCompany(req, res) {
    try {
        const { email, username, password } = req.body;

        const existingUser = await User.findOne({ where: { Email: email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            Email: email,
            username: username,
            password: hashedPassword
        });

        const { password: _, ...userData } = newUser.toJSON();
        res.status(201).json({ 
            message: 'Company registered successfully',
            user: userData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function loginCompany(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { Email: email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, type: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.Email,
                username: user.username,
                type: 'admin'
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function loginEmployee(req, res) {
    try {
        const { email, password } = req.body;

        const employee = await Employee.findOne({ where: { Email: email } });
        if (!employee) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, employee.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { 
                employeeId: employee.employeeId,
                type: 'employee' 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            employee: {
                id: employee.employeeId,
                email: employee.Email,
                name: employee.name,
                lastName: employee.lastName,
                role: employee.role,
                type: 'employee'
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerCompany,
    loginCompany,
    loginEmployee
};
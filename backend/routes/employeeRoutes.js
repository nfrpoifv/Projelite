const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/authMiddleware')

router.post('/employees', employeeController.createEmployee);

router.get('/employees', employeeController.listEmployees);

router.get('/employees/:id', employeeController.getEmployee);

router.put('/employees/:id', employeeController.updateEmployee);

router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;

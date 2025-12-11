const express = require('express');
const router = express.Router();

const { authenticateAdmin, authenticateEmployee } = require('../middlewares/authMiddleware');

const authController = require('../controllers/authController');
const employeeController = require('../controllers/employeeController');
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const employeeTaskController = require('../controllers/employeeTaskController');
const userController = require('../controllers/userController');

//PUBLIC ROUTES 
router.post('/auth/register', authController.registerCompany);
router.post('/auth/login/company', authController.loginCompany);
router.post('/auth/login/employee', authController.loginEmployee);

//ADMIN ROUTES 
router.get('/admin/profile', authenticateAdmin, userController.getProfile);
router.put('/admin/profile', authenticateAdmin, userController.updateProfile);
router.put('/admin/profile/password', authenticateAdmin, userController.changePassword);

router.post('/admin/employees', authenticateAdmin, employeeController.createEmployee);
router.get('/admin/employees', authenticateAdmin, employeeController.listEmployees);
router.get('/admin/employees/:id', authenticateAdmin, employeeController.getEmployee);
router.put('/admin/employees/:id', authenticateAdmin, employeeController.updateEmployee);
router.delete('/admin/employees/:id', authenticateAdmin, employeeController.deleteEmployee);

router.post('/admin/projects', authenticateAdmin, projectController.createProject);
router.get('/admin/projects', authenticateAdmin, projectController.listProjects);
router.get('/admin/projects/:id', authenticateAdmin, projectController.getProject);
router.put('/admin/projects/:id', authenticateAdmin, projectController.updateProject);
router.delete('/admin/projects/:id', authenticateAdmin, projectController.deleteProject);

router.post('/admin/tasks', authenticateAdmin, taskController.createTask);
router.get('/admin/tasks', authenticateAdmin, taskController.listTasks);
router.get('/admin/tasks/:id', authenticateAdmin, taskController.getTask);
router.put('/admin/tasks/:id', authenticateAdmin, taskController.updateTask);
router.delete('/admin/tasks/:id', authenticateAdmin, taskController.deleteTask);
router.get('/admin/projects/:projectId/tasks', authenticateAdmin, taskController.getTasksByProject);

//EMPLOYEE ROUTES 
router.get('/employee/tasks', authenticateEmployee, employeeTaskController.getMyTasks);
router.get('/employee/tasks/:id', authenticateEmployee, employeeTaskController.getMyTask);
router.put('/employee/tasks/:id/status', authenticateEmployee, employeeTaskController.updateTaskStatus);
router.get('/employee/projects', authenticateEmployee, employeeTaskController.getMyProjects);
router.get('/employee/projects/:projectId/tasks', authenticateEmployee, employeeTaskController.getMyTasksByProject);

module.exports = router;
const express =  require('express')
const employeeController = require('../controllers/employeeController')

const employeeRouter = express.Router()

employeeRouter.post('/checkemplogin',employeeController.checkemployeelogin)
employeeRouter.get('/employeeprofile/:id',employeeController.empProfile)
employeeRouter.post('/applyleave',employeeController.applyLeave)

module.exports = employeeRouter
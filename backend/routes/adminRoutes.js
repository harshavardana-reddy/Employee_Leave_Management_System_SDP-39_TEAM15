const express = require('express')
const adminController = require('../controllers/adminController')
const multer = require('multer');
const csv = require('csvtojson')
const bodyParser = require('body-parser')
const adminrouter = express.Router()

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage,
})


adminrouter.post('/checkadminlogin',adminController.checkAdminLogin)
adminrouter.post('/addEmployee',adminController.addEmployee)
adminrouter.get('/viewEmployees',adminController.viewEmployees)
adminrouter.post('/upload',upload.single("file"),adminController.addEmployeebyFile)
adminrouter.delete('/deleteEmployee/:id',adminController.deleteEmployeeByID)
adminrouter.get('/leavesapplied',adminController.viewAppliedLeaves)
adminrouter.put('/approve/:id',adminController.approveLeave)
adminrouter.put('/reject/:id',adminController.rejectLeave)
adminrouter.delete('/deleteleaveByid/:id',adminController.deleteLeaveByID)
adminrouter.put('/updateEmployee/:id',adminController.updateEmployee)

module.exports = adminrouter


const AdminModel = require('../models/Admin');
const EmployeeModel = require('../models/Employees');
const multer = require('multer');
const csv = require('csvtojson')
const bodyParser = require('body-parser')
const LeaveModel = require('../models/Leaves')

const checkAdminLogin = async (req, res) => {
    try {
        const input = req.body; 
        const admin = await AdminModel.findOne(input); 
        if (admin != null) {
            res.status(200).send("LoginSuccess");
        } else {
            res.status(404).send("Invalid username or password");
        }
    } catch (e) {
        console.log(e); 
        res.status(500).send("Internal Server Error"); 
    }
}

const addEmployee = async(req,res)=>{
    try{
        const input = req.body;
        const emp = new EmployeeModel(input)
        await emp.save()
        res.status(200).send("Successfully added")
    }
    catch(e){
        console.log(e); 
        res.status(500).send("Internal Server Error"); 
    }
}




const addEmployeebyFile = async (req, res) => {
    try {
        const emp = await csv().fromFile(req.file.path);
        if (!emp || emp.length === 0) {
            return res.status(400).send("No data found in the CSV file.");
        }

        await EmployeeModel.insertMany(emp)
            .then(() => {
                console.log("Data added successfully.");
                res.status(200).send("Data added successfully.");
            })
            .catch((err) => {
                console.error("Error inserting data:", err);
                res.status(500).send("Internal Server Error.");
            });
    } catch (error) {
        console.error("Error parsing CSV file:", error);
        res.status(500).send("Internal Server Error.");
    }
};


const viewEmployees = async (req, res) => {
    try {
        const response = await EmployeeModel.find().sort({EmployeeID:1});
        res.status(200).json(response); // Removed .json() from response
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}

const deleteEmployeeByID = async(req,res)=>{
    try{
        const empid = req.params.id
        await EmployeeModel.findOneAndDelete({ EmployeeID: empid })
        res.status(200).send("Deleted Succesfully")
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("Internal Server Error.");
    }

}

const viewAppliedLeaves = async(req,res)=>{
    try{
        const leaves = await LeaveModel.find().sort({LeaveID:1})
        await res.json(leaves)
    }
    catch(e){
        console.log(e.message)
    }
}

const approveLeave = async (req, res) => {
    const lid = req.params.id;
    try {
        const leave = await LeaveModel.findOne({ LeaveID: lid });
        if (!leave) {
            return res.status(404).json({ error: 'Leave not found' });
        }
        await LeaveModel.updateOne({ LeaveID: lid }, { $set: { LeaveStatus: "Approved" } });
        console.log(leave);
        return res.status(200).json({ message: 'Leave approved successfully' });
    } catch (error) {
        console.error('Error approving leave:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const rejectLeave = async(req,res)=>{
    const lid = req.params.id;
    try {
        const leave = await LeaveModel.findOne({ LeaveID: lid });
        if (!leave) {
            return res.status(404).json({ error: 'Leave not found' });
        }
        await LeaveModel.updateOne({ LeaveID: lid }, { $set: { LeaveStatus: "Rejected" } });
        console.log(leave);
        return res.status(200).json({ message: 'Leave approved successfully' });
    } catch (error) {
        console.error('Error approving leave:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}
const deleteLeaveByID = async(req,res)=>{
    try{
        const empid = req.params.id
        await LeaveModel.findOneAndDelete({ LeaveID: empid })
        res.status(200).send("Deleted Succesfully")
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("Internal Server Error.");
    }

}
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const employeeData = req.body;

    try {
        // Update the existing employee by EmployeeID
        const updatedEmployee = await EmployeeModel.updateOne({ EmployeeID: id }, { $set: employeeData });

        if (updatedEmployee.nModified === 0) {
            return res.status(404).json({ error: "Employee not found or no changes made" });
        }

        // Fetch the updated employee data
        const updatedData = await EmployeeModel.findOne({ EmployeeID: id });

        // Return the updated employee data in the response
        res.status(200).json(updatedData);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

  

  
  

module.exports = { checkAdminLogin,addEmployee,viewEmployees,addEmployeebyFile,deleteEmployeeByID,viewAppliedLeaves,approveLeave,rejectLeave,deleteLeaveByID,updateEmployee };

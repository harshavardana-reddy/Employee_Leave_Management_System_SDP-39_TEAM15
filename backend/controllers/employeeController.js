const EmployeeModel = require('../models/Employees');
const LeaveModel = require('../models/Leaves');

const checkemployeelogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const employee = await EmployeeModel.findOne({ EmployeeID: username });

        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        
        if (password !== employee.EmployeePassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful', employee });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const empProfile = async(req, res) => {
    
    try{
        const empid = req.params.id
        const emp = await EmployeeModel.findOne({EmployeeID: empid})
        return res.status(200).json(emp)
    }
    catch(e){
        console.log(e)
        return res.status(500).json({ message: 'Internal server error' });
    }

}

const applyLeave = async(req, res) => {
    try{
        const input = req.body;
        const leave = new LeaveModel(input)
        await leave.save()
        res.status(200).send("leave Succesfully Applied")
    }
    catch(e){
        console.log(e); 
        res.status(500).send("Internal Server Error"); 
    }

}




module.exports = { checkemployeelogin, empProfile, applyLeave };

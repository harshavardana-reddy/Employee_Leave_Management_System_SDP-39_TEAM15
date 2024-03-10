const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    EmployeeID:{
        type:String,
        
        
    },
    LeaveID:{
        type:String,
        required:true,
        default: generateID ,
        unique: true,
    },
    LeaveType:{
        type:String,
        required:true,
        enum:["Sick Leave","Casual Leave","Maternity Leave","Medical Leave","Compensated Casual Leave","Half-Paid Leave"]
    },
    LeaveStart:{
        type:String,
        required:true,
    },
    LeaveEnd:{
        type:String,
        required:true,
    },
    LeaveMessage:{
        type:String,
        required:true
    },
    LeaveStatus:{
        type:String,
        required:true,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }
})

function generateID() {
    const id = Math.floor(Math.random() * (900000 - 500000 + 1)) + 500000;
    return id.toString(); 
}



const LeaveModel = mongoose.model('Leave',LeaveSchema)
module.exports = LeaveModel
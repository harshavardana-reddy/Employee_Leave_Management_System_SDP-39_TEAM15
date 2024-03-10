const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    EmployeeID: {
        type: String,
        unique: true,
        default: generateID 
    },
    EmployeeName: {
        type: String,
        required: true
    },
    EmployeeDOB: {
        type: String,
        required: true
    },
    EmployeeGender: {
        type: String,
        required: true,
        enum:["Male","Female","Others"]
    },
    EmployeeAge: {
        type: Number,
        required: true
    },
    EmployeeMailID: {
        type: String,
        required: true,
        
    },
    EmployeeContact: {
        type: String,
        required: true
    },
    EmployeeDepartment: {
        type: String,
        required: true,
        enum: ["CSE(Honors)", "CSE(Regulars)", "ECE", "BT", "MECH"]
    },
    EmployeeQualification: {
        type: String,
        required: true,
        enum: ["Ph.D", "M.Tech", "PG", "B.Tech"]
    },
    EmployeeSalary: {
        type: String,
        required: true
    },
    EmployeeLocation: {
        type: String,
        required: true
    },
    EmployeePassword: {
        type: String,
        default:function(){
            return this.EmployeeDOB
        }
    }
});

// Function to generate random ID
function generateID() {
    const id = Math.floor(Math.random() * (9000 - 5000 + 1)) + 5000;
    return id.toString(); // Convert to string
}

// Pre-save hook to generate ID before saving
EmployeeSchema.pre('save', function(next) {
    if (!this.EmployeeID) {
        this.EmployeeID = generateID();
    }
    next();
});

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);
module.exports = EmployeeModel;

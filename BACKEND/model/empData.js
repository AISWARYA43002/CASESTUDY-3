const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  empId: {
    type: String,
    required: true,
    unique: true
  },
  designation: String,
  salary: Number,
  department: String,
  location: String
});

module.exports = mongoose.model('empl', employeeSchema);

const mongoose = require('mongoose');
const Person = require('./Person.js');
const Group = require('./Group.js');  
mongoose.connect('mongodb://localhost:27017/educateDB');

exports.createStudentListDb = function () {
    const StudentListSchema = mongoose.Schema({
        idGroup: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: "Group",
            unique: true
        },
        idStudent: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: "Person",
            unique: true
        }
    });

    exports.StudentListDb = mongoose.model('StudentList', StudentListSchema);
}

const { Int32 } = require('mongodb');
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/educateDB');
const Subject = require('./Subject.js'); 
const Person = require('./Person.js'); 
const ClassRoom = require('./ClassRoom.js'); 
const Group = require('./Group.js'); 

exports.createLessonDb=function (){
    const LessonSchema=mongoose.Schema({
        idSubject : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Subject'
        },
        idTeacher : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Person'
        },
        date : {
            type: Date,
            required: true
        },
        pareNumber : {
            type: Number,
            required: true,
        },
        idClass: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'ClassRoom'
        },
        idGroup : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Group'
        }
    });
    
    exports.LessonDb=mongoose.model('Lesson',LessonSchema);
}
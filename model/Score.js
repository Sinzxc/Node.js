const mongoose = require('mongoose');
const { Int32 } = require('mongodb');
const Subject = require('./Subject.js'); 
const Person = require('./Person.js'); 
mongoose.connect('mongodb://localhost:27017/educateDB');

exports.createScoreDb = function () {
    const ScoreSchema = mongoose.Schema({
        idLesson: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: "Lesson" 
        },
        idStudent: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: "Person"  
        },
        value: {
            type: Number, 
            required: true
        }
    });

    exports.ScoreDb = mongoose.model('Score', ScoreSchema);
}

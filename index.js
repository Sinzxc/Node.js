const express = require('express')
const {MongoClient} = require('mongodb')
const bodyParser = require('body-parser')
const register = require('./controllers/auth&register/register')
const auth = require('./controllers/auth&register/auth')
const timetableAdd=require('./controllers/timetable/timetableAdd')


const User = require('./model/User')
const Role = require('./model/Role')
const ClassRoom = require('./model/ClassRoom')
const Group = require('./model/Group')
const Lesson = require('./model/Lesson')
const Person = require('./model/Person')
const Score = require('./model/Score')
const StudentList = require('./model/StudentList')
const Subject = require('./model/Subject')

const PORT=3000;
const URL="http://localhost"

const app = express( )
app.get('/', (req, res) => {
    res.send('Home Page!')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

Role.createRoleDb();
User.createUserDb();
ClassRoom.createClassRoomDb();
Group.createGroupDb();
Lesson.createLessonDb();
Person.createPersonDb();
Score.createScoreDb();
StudentList.createStudentListDb(); 
Subject.createSubjectDb();

register.posts(app)
auth.posts(app)
timetableAdd.posts(app)


app.listen(PORT, (req, res) => {
    console.log("Server is running on port: " + PORT);
});

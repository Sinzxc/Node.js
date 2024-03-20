const User = require('./model/User')
const Role = require('./model/Role')
const ClassRoom = require('./model/ClassRoom')
const Group = require('./model/Group')
const Lesson = require('./model/Lesson')
const Person = require('./model/Person')
const Score = require('./model/Score')
const StudentList = require('./model/StudentList')
const Subject = require('./model/Subject')

exports.connect=function() {
    Role.createRoleDb();
    User.createUserDb();
    ClassRoom.createClassRoomDb();
    Group.createGroupDb();
    Lesson.createLessonDb();
    Person.createPersonDb();
    Score.createScoreDb();
    StudentList.createStudentListDb(); 
    Subject.createSubjectDb();
}
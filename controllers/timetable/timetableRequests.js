const Group = require('../../model/Group');
const Lesson = require('../../model/Lesson');
const Subject = require('../../model/Subject');
const ClassRoom = require('../../model/ClassRoom');
const Person = require('../../model/Person');

exports.getLessonsOnDay = async function(req, res) {
    try {
        const group = await Group.GroupDb.findOne({ name: req.body.group });
        const existingLessons = await Lesson.LessonDb.find({
            date: new Date(req.body.date),
            idGroup: group.id,
        });
        if(existingLessons.length !== 0) {
            const formattedLessons = [];
            for(const lesson of existingLessons) {
                const subject = await Subject.SubjectDb.findOne({ _id: lesson.idSubject });
                const teacher = await Person.PersonDb.findOne({ _id: lesson.idTeacher });
                const classRoom = await ClassRoom.ClassRoomDb.findOne({ _id: lesson.idClass });
                const teacherFullName = `${teacher.name} ${teacher.sname}` + (teacher.patronym ? ` ${teacher.patronym}` : '');

                formattedLessons.push({
                    subject: subject.name,
                    teacher: teacherFullName,
                    date: lesson.date,
                    pareNumber: lesson.pareNumber,
                    classRoom: classRoom.name,
                    group: group.name
                });
            }
            res.json(formattedLessons);
        } else {
            return res.status(404).send('Занятий не найдено');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Произошла ошибка');
    }
};

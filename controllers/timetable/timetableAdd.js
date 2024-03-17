const Subject=require('../../model/Subject')
const ClassRoom=require('../../model/ClassRoom')
const Group=require('../../model/Group')
const Person=require('../../model/Person')
const StudentList  = require('../../model/StudentList')
exports.posts = function as (app) {
    app.post('/api/addSubject', async (req, res) => {
        const existingSubject = await Subject.SubjectDb.findOne({ name: req.body.subject });
        if(existingSubject!=null) {
            return res.status(409).send('Предмет уже сущетвует');
        }

        const newSubject = new Subject.SubjectDb({
            name: req.body.subject,
        });
        
        newSubject.save()
            .then(() => {
                res.status(200).send('Предмет добавлен');
            })
            .catch(err => {
                switch(err.name) {
                    default:
                    {
                        console.error('Ошибка сервера:', err.message);
                        res.status(500).send('Ошибка сервера');
                        break;
                    }
                }
               
            });
    });

    app.post('/api/addClassRoom', async (req, res) => {
        const existingClassRoom = await ClassRoom.ClassRoomDb.findOne({ name: req.body.classRoom });
        if(existingClassRoom!=null) {
            return res.status(409).send('Кабинет уже сущетвует');
        }

        const newClassRoom = new ClassRoom.ClassRoomDb({
            name: req.body.classRoom
        });
        
        newClassRoom.save()
            .then(() => {
                res.status(200).send('Кабинет добавлен');
            })
            .catch(err => {
                switch(err.name) {
                    default:
                    {
                        console.error('Ошибка сервера:', err.message);
                        res.status(500).send('Ошибка сервера');
                        break;
                    }
                }
               
            });
    });

    app.post('/api/addGroup', async (req, res) => {
        const existingGroup = await Group.GroupDb.findOne({ name: req.body.group });
        if(existingGroup!=null) {
            return res.status(409).send('Группа уже сущетвует');
        }

        const newGroup = new Group.GroupDb({
            name: req.body.group
        });
        
        newGroup.save()
            .then(() => {
                res.status(200).send('Группа добавлен');
            })
            .catch(err => {
                switch(err.name) {
                    default:
                    {
                        console.error('Ошибка сервера:', err.message);
                        res.status(500).send('Ошибка сервера');
                        break;
                    }
                }
               
            });
    });

    app.post('/api/addPerson', async (req, res) => {
        const existingPerson = await Person.PersonDb.findOne({ name: req.body.name,sname:req.body.sname,patronym:req.body.patronym });
        if(existingPerson!=null) {
            return res.status(409).send('Person уже сущетвует');
        }

        const newPerson = new Person.PersonDb({
            name: req.body.name,
            sname:req.body.sname,
            patronym:req.body.patronym 
        });
        
        newPerson.save()
            .then(() => {
                res.status(200).send('Person добавлен');
            })
            .catch(err => {
                switch(err.name) {
                    default:
                    {
                        console.error('Ошибка сервера:', err.message);
                        res.status(500).send('Ошибка сервера');
                        break;
                    }
                }
               
            });
    });

    app.post('/api/addStudentInGroup', async (req, res) => {
        const group = await Group.GroupDb.findOne({ name: req.body.group });
        const student = await Person.PersonDb.findOne({name: req.body.name,sname:req.body.sname,patronym:req.body.patronym});
        const existingStudent = await StudentList.StudentListDb.findOne({ idGroup:group.id,idStudent:student.id});
        if(existingStudent!=null) {
            return res.status(409).send('Студент уже есть в одной из групп');
        }

        const newStudentInGroup = new StudentList.StudentListDb(
        {
                idGroup: group.id,
                idStudent: student.id
            }
        );
        
        newStudentInGroup.save()
            .then(() => {
                res.status(200).send('Ученик добавлен в группу');
            })
            .catch(err => {
                switch(err.name) {
                    default:
                    {
                        console.error('Ошибка сервера:', err.message);
                        res.status(500).send('Ошибка сервера');
                        break;
                    }
                }
               
            });
    });
}
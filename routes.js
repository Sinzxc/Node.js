const timetableAdd=require('./controllers/timetable/timetableAdd')
const timetableRequest=require('./controllers/timetable/timetableRequests')
const auth=require('./controllers/auth&register/auth');
const register=require('./controllers/auth&register/register');

exports.posts=function(app){
    //Add a new
    app.post('/api/addSubject', async (req, res) => {
        timetableAdd.addSubject(req,res);
    });
    app.post('/api/addClassRoom', async (req, res) => {
        timetableAdd.addClassRoom(req,res);
    });
    app.post('/api/addGroup', async (req, res) => {
        timetableAdd.addGroup(req,res);
    });
    app.post('/api/addPerson', async (req, res) => {
        timetableAdd.addPerson(req,res);
    });
    app.post('/api/addStudentInGroup', async (req, res) => {
        timetableAdd.addStudentInGroup(req,res);
    });
    app.post('/api/addLesson', async (req, res) => {
        timetableAdd.addLesson(req,res);
    });
    app.post('/api/addScore', async (req, res) => {
        timetableAdd.addScore(req,res);
    });

    //Login
    app.post('/api/signin', async (req, res) => {
        auth.signin(req,res);
    });

    //Registration
    app.post('/api/registerUser', async (req, res) => {
        register.registerUser(req,res);
    });


    //Home page
    app.get('/', (req, res) => {
        res.send('Home Page!')
    })

    app.post('/api/getLessonsOnDay', (req, res) => {
        timetableRequest.getLessonsOnDay(req,res);
    })

}
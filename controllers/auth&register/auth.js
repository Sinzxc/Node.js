const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const User = require('../../model/User.js');
const Role = require('../../model/Role.js');
const jwt = require('jsonwebtoken');
const { secret } = require('../../authConfig.js');


mongoose.connect('mongodb://localhost:27017/educateDB');

const generateToken = (user) => {
    return jwt.sign({ username: user.username }, secret, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Отсутствует токен аутентификации');
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).send('Неверный токен');
        }
        req.user = user;
        next();
    });
};

exports.posts = function as (app) {
    app.post('/api/signin', async (req, res) => {

        const user = await User.UserDb.findOne({ username:req.body.username });
        if(user==null)
        {
            return res.status(404).send('Пользователь не найден');
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if(isPasswordValid) {
            const token = generateToken(user);
            res.status(200).json({ token });
        }
        else{
            res.status(403).send('Ошибка авторизации');
        }
    });

    app.get('/api/protected', authenticateToken, (req, res) => {
        res.send('Это защищенный маршрут');
    });

    app.get('/api/user', authenticateToken, async (req, res) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (token == null) {
            return res.sendStatus(401);
        }   
        try {
            const decodedToken = jwt.verify(token, secret);
            const username = decodedToken.username;   
            const user = await User.UserDb.findOne({ username: username });
            const{role}=user
            const roleObject = await Role.RoleDb.findOne({ _id: role.toString() });
            res.send(roleObject.name);
        } catch (error) {
            console.error(error);
            res.sendStatus(403); 
        }
    });
};




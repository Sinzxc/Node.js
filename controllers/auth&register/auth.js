const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../model/User.js');
const Role = require('../../model/Role.js');
const jwt = require('jsonwebtoken');
const { secret, refreshSecret } = require('../../authConfig.js');

mongoose.connect('mongodb://localhost:27017/educateDB');

const generateAccessToken = (user) => {
    return jwt.sign({ username: user.username }, secret, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ username: user.username }, refreshSecret, { expiresIn: '7d' });
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

exports.signin = async function(req, res) {
    const user = await User.UserDb.findOne({ username: req.body.username });
    if (!user) {
        return res.status(404).send('Пользователь не найден');
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.status(200).json({ accessToken, refreshToken });
    } else {
        res.status(403).send('Ошибка авторизации');
    }
};

exports.refreshToken = async function(req, res) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(400).send('Отсутствует токен обновления');
    }

    jwt.verify(refreshToken, refreshSecret, async (err, user) => {
        if (err) {
            return res.status(403).send('Неверный токен обновления');
        }
        const accessToken = generateAccessToken(user);
        res.status(200).json({ accessToken });
    });
};

const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/educateDB');
const bcrypt = require('bcrypt');
const User = require('../../model/User')


    exports.registrUser= async function(req,res){

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const existingUser = await User.UserDb.findOne({ username: req.body.username });
        if(existingUser!=null) {
            return res.status(409).send('Username занят');
        }

        const newUser = new User.UserDb({
            username: req.body.username,
            password: hashedPassword.toString(),
            role:"65f5ae6d4fa831f41e5368eb"
        });
        
        newUser.save()
            .then(() => {
                console.log('Пользователь успешно сохранен');
                res.status(200).send('Пользователь успешно зарегистрирован');
            })
            .catch(err => {
                switch(err.name) {
                   case "ValidationError":
                    {
                        console.error('Ошибка валидации:', err.message);
                        res.status(400).send(err.message);
                        break;
                    }
                    default:
                    {
                        console.error('Ошибка при сохранении пользователя:', err);
                        res.status(500).send('Ошибка сервера');
                        break;
                    }
                }
               
            });
    }



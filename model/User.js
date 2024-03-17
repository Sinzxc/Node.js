const mongoose = require('mongoose');
const Role = require('./Role.js'); // Убедитесь, что путь к модели ролей правильный

mongoose.connect('mongodb://localhost:27017/educateDB');

exports.createUserDb = function () {
    const UserSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: "Role" 
        }
    });

    exports.UserDb = mongoose.model('User', UserSchema);
}

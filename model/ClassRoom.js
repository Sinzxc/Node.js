const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/educateDB');


exports.createClassRoomDb=function (){
    const ClassRoomSchema=mongoose.Schema({
        name : {
            type: String,
            required: true,
            unique: true
        }
    });
    
    exports.ClassRoomDb=mongoose.model('ClassRoom',ClassRoomSchema);
}
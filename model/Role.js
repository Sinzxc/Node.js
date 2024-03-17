const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/educateDB');


exports.createRoleDb=function (){
    const RoleSchema=mongoose.Schema({
        name : {
            type: String,
            required: true,
            unique: true
        }
    });
    
    exports.RoleDb=mongoose.model('Role',RoleSchema);
}
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/educateDB');


exports.createGroupDb=function (){
    const GroupSchema=mongoose.Schema({
        name : {
            type: String,
            required: true,
            unique: true
        }
    });
    
    exports.GroupDb=mongoose.model('Group',GroupSchema);
}
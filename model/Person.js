const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/educateDB');


exports.createPersonDb=function (){
    const PersonSchema=mongoose.Schema({
        name : {
            type: String,
            required: true
        },
        sname : {
            type: String,
            required: true 
        },
        patronym : {
            type: String
        }
    });
    
    exports.PersonDb=mongoose.model('Person',PersonSchema);
}
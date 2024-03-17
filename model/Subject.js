const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/educateDB');


exports.createSubjectDb=function (){
    const SubjectSchema=mongoose.Schema({
        name : {
            type: String,
            required: true,
            unique: true
        }
    });
    
    exports.SubjectDb=mongoose.model('Subject',SubjectSchema);
}
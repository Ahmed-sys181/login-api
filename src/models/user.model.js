import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username : {
        type : String ,
        required : true , 
        unique : true , 
        minlength : 5 , 
        maxlength : 20 , 
        trim : true 
    }, 
    password : { 
        type : String ,
        required : true , 
        minlength : 8 ,
        maxlength : 20 
    }, 
    email : { 
        type : String ,
        required : true , 
        unique : true ,
        lowercase : true ,
        trim : true ,
        match : [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address" ]
    }
},
{
    timestamps : true
}
)

export const User = mongoose.model('User' , userSchema) ;
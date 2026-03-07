import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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
        required : true
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

userSchema.pre('save' , async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password , 10);
})

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password , this.password);
}

export const User = mongoose.model('User' , userSchema) ;
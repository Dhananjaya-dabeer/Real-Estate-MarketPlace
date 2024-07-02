import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique : true
    },
    email:{
        type:String,
        required: true,
        unique : true
    },
    password:{
        type:String,
        required: true,
    },
    avatar:{
        type:String,
        default:"https://i.ibb.co/yW0ttLr/3d-illustration-person-with-sunglasses-23-2149436188.jpg"
    }
}, {timestamps:true})

const User = mongoose.model('User', userSchema)

export default User
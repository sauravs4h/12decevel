const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    email:String,
    password:String
});

const todoSchema=mongoose.Schema({
    id:Number,
    taskname:String,
    status:String,
    tag:String
})


const UserModel=mongoose.model("user",userSchema);
const todoModel=mongoose.model("task",todoSchema);


module.exports={UserModel,todoModel}
const express=require("express");
const {connection}=require("./config/db");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const{UserModel,todoModel}=require("./model/todo.model")
const{todoroute}=require("./routes/todo.routr");

const {auth}=require("./auth");


const app=express();

app.use(express.json());

app.post("/signup",(req,res)=>{
    const {email,password}=req.body;


    try{
        bcrypt.hash(password, 2,async function(err, hash) {
            const user=new UserModel({email,password:hash});
            await user.save();
            res.send("sign up successfull");

        });

    }
    catch(err){
        res.send("not signup");
    }

})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const u=await UserModel.find({email});
    const hashpassword=u[0].password;
    const uuid=u[0]._id

    console.log(uuid)
    if(email==u[0].email){
        try{
            bcrypt.compare(password, hashpassword, function(err, result) {
                if(result){
                    var token = jwt.sign({ "userid": uuid }, 'hush');
                    res.send({"msg":"login successfull","token":token});
                }
            });

        }
        catch(err){
            res.send("login again")
        }
    }
    else{
        res.send("login again")
    }

})


app.get("/",(req,res)=>{
    res.send("what's up")
})

app.use(auth)
app.use("/todo",todoroute);


app.listen("7500",async()=>{
    try{
        await connection;
        console.log("connected with db")
    }
    catch(err){
        console.log("not connected with db")
    }
    console.log("server is running");
})

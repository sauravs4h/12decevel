const express=require("express");

const todoroute=express.Router();
const{UserModel,todoModel}=require("../model/todo.model")
todoroute.use(express.json());


const authenticaton=(req,res,next)=>{
    let payload=req.body;
    if(typeof(payload.taskname)=="string" && typeof(payload.status)=="string" && typeof(payload.tag)=="string"){
        next();
    }
    else{
        res.send("data invalid")
    }
}

todoroute.use("/post",authenticaton)

todoroute.get("/",async(req,res)=>{
    let all=await todoModel.find();
    res.send(all)
})

todoroute.post("/post",async(req,res)=>{
    const payload=req.body;
    try{
        
         await todoModel.insertMany([payload]);
        res.send("posted");

    }
    catch(err){
        res.send("not posted")
    }

})




todoroute.patch("/update/:uid",async(req,res)=>{
    const payload=req.body;
    const id=req.params.uid
    
    try{
        await todoModel.findByIdAndUpdate({_id:id},payload);
        res.send("updated");

    }
    catch(err){
        res.send("not updated")
    }

})


todoroute.delete("/delete/:uid",async(req,res)=>{
    const payload=req.body;
    const id=req.params.uid
    try{
        await todoModel.findByIdAndRemove({_id:id},payload);
        res.send("deleted");

    }
    catch(err){
        res.send("not deleted");
        console.log(err);
    }

})



module.exports={todoroute};
var jwt = require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token=req.headers.authanticaton;

    if(token){
        var decoded = jwt.verify(token, 'hush');

        if(decoded){
            const userid=decoded.userid;
            req.body.userid=userid;
            next();
        }else{
            res.send("please login")
        }
    }else{
        res.send("please login")
    }
}


module.exports={auth}
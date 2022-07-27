const Users = require("../models/Users");

const UserController=async (req,res,next)=>{
    const searchable=req.body;
    
    console.log(req.body.username);
    try {
        let result=await Users.find({userName: new RegExp('^'+req.body.username,'i')});
        if(result.length>0){
        for (i in result ){
            delete result[i].email;
            delete result[i].password;
        }
        res.send(result);
    }
    else{
        res.send({error:"no user found"});
    }
    }
    catch(e){
        res.send({error:"problem getting user that you are searching"});
    }
}
module.exports={UserController};
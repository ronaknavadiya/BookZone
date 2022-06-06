const getUser = async (req,res)=>{
    console.log(req.query);
    res.status(200).send("get User called")
}

const createtUser = async (req,res)=>{
    console.log(req.body);
    res.status(200).send(" User created")
}

module.exports = {getUser,createtUser}
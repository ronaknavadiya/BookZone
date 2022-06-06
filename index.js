const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser');
const connectDB = require("./Database/connect")
const authRouter = require("./Routes/auth")
require('dotenv').config()
const port = process.env.port || 5000;

// Middleware
app.use(cors())
app.use(bodyParser.json())   // applied to access body of request object
app.use(express.json());

// routes
app.use("/api/V1/user",authRouter);



app.get("/",(req,res)=>{
    res.status(200).send("Hello from Backend")
})



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
            app.listen(port,()=>{
            console.log(`Listening on port: ${port}`);
        })
    } catch (error) {
        console.log("Error: ",error);
    }
}

start();
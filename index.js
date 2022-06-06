const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser');
const connectDB = require("./Database/connect")

require('dotenv').config()
const port = process.env.port || 5000;

// Middleware
app.use(cors())
app.use(bodyParser.json())   // applied to access body of request object


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
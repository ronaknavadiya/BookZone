const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser');

require('dotenv').config()
const port = process.env.port || 5000;

// Middleware
app.use(cors())
app.use(bodyParser.json())   // applied to access body of request object


app.get("/",(req,res)=>{
    res.status(200).send("Hello from Backend")
})

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
})
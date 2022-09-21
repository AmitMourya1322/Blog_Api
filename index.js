const express = require('express');
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoriesRoute = require('./routes/categories')
const multer = require("multer");
dotenv.config();


app.use(express.json())
mongoose.connect(process.env.MONGO,{
   
    useUnifiedTopology:true,
    
}).then(console.log("connnected to mongodb")).catch(err=>console.log(err));

// app.use("/",(req,res)=>{
//     console.log("hey this is the main url")
// })

// app.get('/',(req,res)=>{
//     return res.send("<h1>Hello World</h1>")
// })
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,"hello.png")
    },
})

const upload =multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
})
app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories",categoriesRoute)

app.listen("5000",()=>{
    console.log("server is running on 5000")
})
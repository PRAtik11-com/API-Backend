const express=require("express");
const cors=require("cors");
const connection = require("./config/db");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/user.routes");


let app=express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());

//routes
app.use("/api/user",userRouter);




app.listen(process.env.PORT||4000,async()=>{
    try {
        await connection;
       console.log(`server was running at port :${process.env.PORT}`);  
    } catch (error) {
         console.log(error);
    }
})
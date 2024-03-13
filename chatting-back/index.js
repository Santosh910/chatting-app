import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

import router from './routes/index.js';


import cookieParser from 'cookie-parser'
// import UserModel from './models/User.model.js';
// import Jwt from 'jsonwebtoken'
import path from "path"
import { app,server } from './socket/socket.js';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config()
app.use(morgan('dev'))

app.use(cookieParser())
app.use(express.json())

app.get("/test",(req,res)=>{
    res.json('test ok');
});


app.use("/api",router)

app.use(express.static(path.join(__dirname, "/chat-front/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "chat-front", "dist", "index.html"));
});


mongoose.connect(process.env.MONGOURI).then(()=>console.log("database connected"))

server.listen(PORT,()=>console.log(`app is running on port ${PORT}`))


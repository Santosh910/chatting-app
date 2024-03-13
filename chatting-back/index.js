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

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


mongoose.connect(process.env.MONGOURI).then(()=>console.log("database connected"))

server.listen(PORT,()=>console.log(`app is running on port ${PORT}`))

// const wss = new WebSocketServer({server});
// wss.on('connection',(connection,req)=>{
    
//    const token = req.headers.token;
//    if(!token){
//       console.log('No token provided');
//       connection.close();
//       return;
//    }

//    try {
//     const {id} = Jwt.verify(token,process.env.JWT_SEC)
//     const user = UserModel.findById(id);
//     if(!user){
//         console.log('User not found');
//         connection.close();
//         return;
//     }
//     connection.send(JSON.stringify({user:{name:user.username,id:user._id},token}))
//    } catch (error) {
//         console.error('Token verification failed:',error.message)
//    }

// //    console.log(`Number of connected clients: ${wss.clients.size}`);

// [...wss.clients].forEach(clients =>{
//     clients.send(JSON.stringify(
//         [...wss.clients].map(c => ({id:c.user._id,name:c.user.username}))
//     ))
// })
// });
// // console.log([...wss.clients].length)
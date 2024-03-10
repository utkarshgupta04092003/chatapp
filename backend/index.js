const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messagesRoute');
const socket = require('socket.io');

const origin = 'http://localhost:5173';

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);


mongoose.connect(`${process.env.DATABASE_URI}${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>console.log("error:", err));

const server = app.listen(process.env.PORT, ()  =>{
    console.log('server started on  port:', process.env.PORT);
})

const io = socket(server, {
    cors:{
        origin: origin,
        credentials: true,
    }
})

// global.onlineUsers = new Map();

// io.on('connection', (socket)=>{

//     global.chatSocket = socket;
//     socket.on('add-user', (userId) =>{
//         console.log(userId, socket.id);
//         onlineUsers.set(userId, socket.id);
//     });

//     socket.on('send-msg', (data)=>{
//         console.log(onlineUsers);
//         console.log('data', data.to);
//         const sendUserSocket = onlineUsers.get(data.to);

//         if(sendUserSocket){
//             console.log('data.msg', data.msg);
//             socket.to(sendUserSocket).emit('msg-recieve', data.msg)
//         }
//     })

// })

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;

    socket.on('add-user', (userId) => {
        console.log(userId, socket.id);
        // Correctly set userId and socket.id into the onlineUsers map
        global.onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', (data) => {
        console.log(global.onlineUsers);
        console.log('data', data);
        const sendUserSocket = global.onlineUsers.get(data.to);
        console.log('sendUserSocket', sendUserSocket);
        if (sendUserSocket) {
            console.log('data.msg', data.message);
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
        }
    });
});


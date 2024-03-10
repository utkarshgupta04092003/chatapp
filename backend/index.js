const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messagesRoute');
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

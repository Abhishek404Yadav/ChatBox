const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMessage =require('./utils/formatmessage');
const {userJoin,getCurrentUser,userLeave,getRoomUsers} =require('./utils/users');


//Express Server and http-server
const app = express(); // Express Server
const server = http.createServer(app); //paasing Express server features to http Server  
const io = socketio(server); 

//Making public folder Static to access the html and css 
app.use(express.static(path.join(__dirname,'public')));

//Run when client connects
io.on('connection',socket=>{
  //When user join any room
  socket.on('joinChat', ({username,room})=>{
     const user = userJoin(socket.id,username,room);
      socket.join(user.room);
      //welcome message to user
      socket.emit("message",formatMessage("ChatboxBot",`welcome ${user.username} to ${user.room} Room`));
      //broadcast to evereywone except user
      socket.to(user.room).emit("message",formatMessage("ChatboxBot",`${user.username} has joined the chat`));
      //sending Current room and user list to client
      io.to(user.room).emit('roomInfo',{
        room:user.room,
        users: getRoomUsers(user.room)
      });
    })
  //user message displayed
  socket.on("chatContent",(msg)=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg));
  })   
  //When user dissconnect
  socket.on("disconnect",()=>{
    const user = userLeave(socket.id);
    if(user){
      io.to(user.room).emit('message',formatMessage("ChatboxBot",`${user.username} has left the chat`))
      //sending Current room and user list to client
      io.to(user.room).emit('roomInfo',{
      room:user.room,
      users: getRoomUsers(user.room)
      });
    }

  })

});

// Listning Port 3000
PORT =  process.env.PORT || 3000 ;

server.listen(PORT, (error) => {
  if (error) console.log("Error occurred, server can't start", error);
  else
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
});

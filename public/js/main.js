const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.querySelector('#users');
const socket = io();

// get username and rooms from url with qs library
const {username,room}= Qs.parse(location.search,{
    ignoreQueryPrefix : true
})
//emitting user to server catched from URL by qs library 
socket.emit("joinChat",{username,room});
//Updating the user list
socket.on('roomInfo',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
})

// Message from server
socket.on("message",message=>{
    outputMessage(message);
    console.log(message);
    // Scroll to the message that was sent last
    chatMessage.scrollTop=chatMessage.scrollHeight;
})

chatForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    // creating refrence to the msg id from html
    const messageTextRef = e.target.elements.msg;
    //gets message content
    const msg = messageTextRef.value;
    //emits message to the server
    socket.emit("chatContent",msg);
    //clear message box
    messageTextRef.value = '';
    messageTextRef.focus();
})
// printing message with DOM manipulation
function outputMessage(message){
    const div =document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    chatMessage.appendChild(div);

}
// printing users with DOM manipulation
function outputUsers(users){
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerText=user.username;
        userList.appendChild(li);
    });
}
// printing RoomName with DOM manipulation
function outputRoomName(room){
    roomName.innerText= room;
}    

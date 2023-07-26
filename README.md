## Real-Time Chat Application using Node.js, Express.js, and Socket.IO

### Requirements:
- Node.js and NPM should be installed on your machine.

### Getting Started:

1. Clone the repository or create a new Node.js project:
   ```
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install the required packages:
   ```
   npm install express socket.io moment
   ```

### Server-Side Implementation (server.js):

1. Set up the Express.js server and Socket.IO.
2. Handle the 'connection' event to manage new user connections.
3. Implement the 'join' event to add users to specific chat rooms.
4. Handle the 'message' event to broadcast messages to all users in a chat room.
5. Implement the 'disconnect' event to handle user disconnections and clean up user data.

### Client-Side Implementation (public/index.html, public/main.js):

1. Create a simple web interface with HTML and CSS for users to join chat rooms and send messages.
2. Use JavaScript (main.js) to implement event listeners for Socket.IO events on the client-side to update the user interface in real-time.

### Error Handling:

1. Implement proper error handling for invalid chat room names, user names, and other potential issues.
2. Display appropriate error messages on the web interface to inform users of errors.

### How to Use:

1. Clone the repository or download the project files.
2. Install the required packages using `npm install`.
3. Start the server using `node server.js`.
4. Open your web browser and navigate to `http://localhost:3000`.
5. Enter your username and select a chat room to join.
6. Start chatting with other users in real-time.

### Testing:

1. Open multiple browser instances or use different devices to simulate multiple users.
2. Join different chat rooms with different usernames to test real-time communication and message broadcasting.

### Technologies Used:

- Node.js
- Express.js
- Socket.IO
- HTML
- CSS
- JavaScript

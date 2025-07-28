# Socket.IO Implementation Guide

This project uses [Socket.IO](https://socket.io/) to enable real-time, bidirectional communication between the server and clients. Below is an overview of how Socket.IO is set up and used in this codebase.

## Server-Side Setup

The Socket.IO server is initialized in [Backend/server.js](Backend/server.js):

```js
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
```

### Connection Handling

When a client connects, the server:
- Reads the `roomId` from the connection query.
- Joins the socket to a room named after the `roomId`.
- Listens for `"chacha"` events and relays messages to other clients in the same room.

```js
io.on('connection', socket => {
    const rooomId = socket.handshake.query.rooomId;
    socket.join(roomId);

    console.log('New client connected');

    socket.on("chacha", msg => {
        console.log(msg);
        socket.to(roomId).emit('chacha', msg);
    });
});
```

### Starting the Server

The server listens on port 3000:

```js
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

## Client-Side Usage

On the client (see [Frontend/src/pages/room/Room.jsx](Frontend/src/pages/room/Room.jsx)), you connect to the server and join a project room:

```js
import { io } from "socket.io-client";

const socket = io('http://localhost:3000', {
    query: {
        roomId: params.roomId
    }
});
```

### Sending and Receiving Messages

- To send a message to the room:
    ```js
    socket.emit('chacha', message);
    ```
- To receive messages from others in the room:
    ```js
    socket.on('chacha', msg => {
        // handle incoming message
    });
    ```

## How It Works

- Each room has a unique `roomId`.
- When a user opens a room, their client connects to the server and joins the corresponding room.
- Messages sent with the `"chacha"` event are broadcast to all other clients in the same room, enabling real-time collaboration.

## Extending Functionality

- To add more events, use `socket.on('eventName', handler)` on both server and client.
- To broadcast to all clients in a room, use `socket.to(roomId).emit('eventName', data)` on the server.
- For more advanced features, see the [Socket.IO documentation](https://socket.io/docs/).

---

**References:**
- [Socket.IO Server API](https://socket.io/docs/v4/server-api/)
- [Socket.IO Client API](https://socket.io/docs/v4/client-api/)

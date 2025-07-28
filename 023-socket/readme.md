# Socket.IO Implementation Guide

This guide explains how to implement real-time communication in your project using [Socket.IO](https://socket.io/). It covers both server-side and client-side setup, with step-by-step instructions.

---

## 1. Install Dependencies

**Backend:**
```sh
npm install socket.io
```

**Frontend:**
```sh
npm install socket.io-client
```

---

## 2. Server-Side Setup

**File:** `Backend/server.js`

1. **Import and Setup:**
    ```js
    const app = require('./src/app');
    const connect = require('./src/db/db');
    connect();

    const server = require('http').createServer(app);
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        }
    });
    ```

2. **Handle Connections and Rooms:**
    ```js
    io.on('connection', socket => {
        const projectId = socket.handshake.query.projectId;
        socket.join(projectId);

        console.log('New client connected');

        socket.on("chacha", msg => {
            console.log(msg);
            socket.to(projectId).emit('chacha', msg);
        });
    });
    ```

3. **Start the Server:**
    ```js
    server.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
    ```

---

## 3. Client-Side Setup

**File:** `Frontend/src/pages/project/Project.jsx` (or similar)

1. **Import and Connect:**
    ```js
    import { io } from "socket.io-client";

    const socket = io('http://localhost:3000', {
        query: {
            projectId: params.projectId // Replace with your actual project ID variable
        }
    });
    ```

2. **Send and Receive Messages:**
    - **Send:**
        ```js
        socket.emit('chacha', message);
        ```
    - **Receive:**
        ```js
        socket.on('chacha', msg => {
            // handle incoming message
        });
        ```

---

## 4. How It Works

- Each project has a unique `projectId`.
- When a user opens a project, their client connects to the server and joins the corresponding room.
- Messages sent with the `"chacha"` event are broadcast to all other clients in the same room.

---

## 5. Extending Functionality

- Add more events using `socket.on('eventName', handler)` on both server and client.
- Broadcast to all clients in a room with `socket.to(roomId).emit('eventName', data)` on the server.
- For advanced features, see the [Socket.IO documentation](https://socket.io/docs/).

---

## 6. Troubleshooting

- Ensure both server and client use the same event names and room IDs.
- Check CORS settings if connecting from a different domain.
- Use browser dev tools and server logs for debugging.

---

## References

- [Socket.IO Server API](https://socket.io/docs/v4/server-api/)
- [Socket.IO Client API](https://socket.io/docs/v4/client-api/)

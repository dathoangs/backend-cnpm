const app = require('./src/app')
const socket = require("socket.io");

const server = app.listen(3056, () => {
    console.log('Chayj thanhf coong!!!!')
})

//socket.io
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});
global.onlineUsers = new Map();

// let onlineUsers = [];


io.on("connection", (socket) => {
    global.chatSocket = socket;


    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });


    socket.on("sendNotification", ({ senderName, receiverName, type, toID, toName }) => {

        const receiverSocketId = onlineUsers.get(toID);

        if (receiverSocketId) {
            const test = io.to(receiverSocketId).emit("getNotification", {
                senderName,
                type,
                toName,
                toID
            });

        } else {
            console.log("Receiver not online or not found.");
        }
        // console.log(a)

        // Assuming 'getUser' is a valid function that retrieves user data based on the receiverName.
        // const receiver = getUser(receiverName);
        // You may want to use the 'receiver' data for further processing or validation, depending on your application logic.
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });



    // joining a new room
    socket.on('joinRoom', (roomId) => {
        console.log({ roomId })
        socket.join(roomId);

        // notify others about the new joining in the room
        socket.to(roomId).emit("newJoining")
    })

    // socket.on('join-room', (roomId, userId) => {
    //     socket.join(roomId)
    //     socket.to(roomId).broadcast.emit('user-connected', userId)

    //     socket.on('disconnect', () => {
    //         socket.to(roomId).broadcast.emit('user-disconnected', userId)
    //     })
    // })

    // send the offer 
    socket.on("sendTheOffer", (offer, roomId) => {

        socket.to(roomId).emit("receiveOffer", offer)
    })

    // send the answer 
    socket.on("sendTheAnswer", (answer, roomId) => {
        console.log({ answer })

        socket.to(roomId).emit("receiveAnswer", answer)
    })


    // send Ice candidate 
    socket.on("sendIceCandidate", (candidate, roomId) => {
        console.log({ candidate })
        console.log({ roomId })


        socket.to(roomId).emit("receiveCandidate", candidate)
    })

    console.log("Socket connected!");

});
process.on('SIGINT', () => {
    server.close(() => console.log(`Exit Server Express`))
})

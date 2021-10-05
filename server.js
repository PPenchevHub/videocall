const express = require("express")
const path = require('path');
const http = require("http")
const app = express()
const server = http.createServer(app)
app.use(express.static(path.join(__dirname, 'frontend/build',"index.html")));
const io = require("socket.io")(server, {
	cors: {
		origin: "https://katonqmamessenger.netlify.app",
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
	socket.emit("me", "0000")

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

const port = process.env.PORT || 5000;
server.listen(port, () => console.log("server is running on port 5000"))

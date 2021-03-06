const express = require("express");
const app = express();
const cors = require("cors")();
const body = require("body-parser");
app.use(body.json());
app.use(cors);
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: "*",
  },
});
const firebase = require("firebase-admin");
const key= require('./key.json')
firebase.initializeApp({
  credential: firebase.credential.cert(key)
})
const fs = firebase.firestore()
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("draw",  (data) => {
    if (data) {
      fs.collection('canvas').doc('canvas').set({json:data});
      io.emit("draw", true);
    }
  });
  socket.on("disconnect", () => {
    console.log(socket.id+"disconnected!!");
  });
});

http.listen(3000, "0.0.0.0", function () {
  console.log(`Server is running on  http://'0.0.0.0':3000`);
});
module.exports = app;

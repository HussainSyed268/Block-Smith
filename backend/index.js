// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
  


const Blockchain = require("./blockChain"); // Import the Blockchain class

const blockchain = new Blockchain(); // Create a new instance of the Blockchain class

const PORT =  4000;

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A peer connected: " + socket.id);

//   socket.on("problem", () => {
    console.log("Received problem event");
    
    const transactions = [
      {
        "transaction_id": 5,
        "timestamp": "2024-05-04T12:40:00",
        "type": "transfer",
        "sender": "Eve",
        "recipient": "Frank",
        "amount": 9
      },
      // Other transactions...
    ];

    const previousHash = blockchain.getLastBlockHash();
    const difficulty = 5; // Number of leading zeros in the hash

    const problemMessage = {
      previousHash,
      difficulty,
      transactions
    };

    io.emit("problem", problemMessage);
//   });

  socket.on("solution", (solution) => {
    console.log("Received solution:", solution);
    const { previousHash, transactions, difficulty, nonce } = solution;
    const hash = blockchain.calculateHash(previousHash, transactions, nonce);

    if (hash.substring(0, difficulty) === '0'.repeat(difficulty)) {
      console.log("Solution is valid.");
      blockchain.addBlock(transactions, nonce, hash, socket.id);
    } else {
      console.log("Solution is invalid.");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

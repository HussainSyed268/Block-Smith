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
  

const connectedPeers = new Map(); 
let solutionReceived = false;
let solvingUser = null;
let preHash = "0";
let trans = [];
const difficulty = 5
const Blockchain = require("./blockChain"); // Import the Blockchain class

const blockchain = new Blockchain(); // Create a new instance of the Blockchain class

const PORT =  4000;

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const generateProblem = () => {
  const previousHash = blockchain.getLastBlockHash();
  preHash = previousHash ;
  console.log("Previous hash: " + previousHash);
  ; // Number of leading zeros in the hash

  // Extract the next 4 transactions from the transactions array
  const nextTransactions = transactions.splice(0, 4);
  trans = nextTransactions;

  const problemMessage = {
    previousHash,
    nextTransactions,
    difficulty,
  };

  io.emit("problem", problemMessage);
  console.log("Problem message sent to all peers:");
};

const transactions = [
  {
    "transaction_id": 5,
    "timestamp": "2024-05-04T12:40:00",
    "type": "transfer",
    "sender": "Eve",
    "recipient": "Frank",
    "amount": 9
  },
  {
    "transaction_id": 6,
    "timestamp": "2024-05-04T12:41:00",
    "type": "transfer",
    "sender": "Frank",
    "recipient": "Eve",
    "amount": 3
  },
  {
    "transaction_id": 7,
    "timestamp": "2024-05-04T12:42:00",
    "type": "transfer",
    "sender": "Alice",
    "recipient": "Bob",
    "amount": 5
  },
  {
    "transaction_id": 8,
    "timestamp": "2024-05-04T12:43:00",
    "type": "transfer",
    "sender": "Bob",
    "recipient": "Alice",
    "amount": 2
  },
  {
    "transaction_id": 9,
    "timestamp": "2024-05-04T12:44:00",
    "type": "transfer",
    "sender": "Charlie",
    "recipient": "David",
    "amount": 7
  },
  {
    "transaction_id": 10,
    "timestamp": "2024-05-04T12:45:00",
    "type": "transfer",
    "sender": "David",
    "recipient": "Charlie",
    "amount": 1
  },
  {
    "transaction_id": 11,
    "timestamp": "2024-05-04T12:46:00",
    "type": "transfer",
    "sender": "Eve",
    "recipient": "Frank",
    "amount": 4
  },
  {
    "transaction_id": 12,
    "timestamp": "2024-05-04T12:47:00",
    "type": "transfer",
    "sender": "Frank",
    "recipient": "Eve",
    "amount": 6
  },
  {
    "transaction_id": 13,
    "timestamp": "2024-05-04T12:48:00",
    "type": "transfer",
    "sender": "Alice",
    "recipient": "Bob",
    "amount": 8
  },
  {
    "transaction_id": 14,
    "timestamp": "2024-05-04T12:49:00",
    "type": "transfer",
    "sender": "Bob",
    "recipient": "Alice",
    "amount": 1
  },
  {
    "transaction_id": 15,
    "timestamp": "2024-05-04T12:50:00",
    "type": "transfer",
    "sender": "Charlie",
    "recipient": "David",
    "amount": 4
  },
  {
    "transaction_id": 16,
    "timestamp": "2024-05-04T12:51:00",
    "type": "transfer",
    "sender": "David",
    "recipient": "Charlie",
    "amount": 3
  }
];




io.on("connection", async (socket) => {
  console.log("A peer connected: " + socket.id);
    
  socket.on("authenticate", (userId) => {
    console.log(`User ${userId} authenticated`);
    connectedPeers.set(userId, socket.id);
  });

  // Initial problem broadcast when a new peer connects
  generateProblem();


  socket.on("solution", async (solution) => {
    if (solutionReceived) {
      // If a solution has already been received, notify the peer that the solution has already been submitted
      socket.emit("solutionRejected", "Another peer has already submitted a solution.");
      return;
    }
    solutionReceived = true
    console.log("Received solution:" , solution);
    const { hash, nonce, userId } = solution;
    solvingUser = userId

    const prevHash = blockchain.calculateHash(preHash, trans, nonce);
    console.log("prevHash: " + prevHash);
    if (hash == prevHash){

    if (hash.substring(0, difficulty) === '0'.repeat(difficulty)) {
      console.log("Solution from " + solvingUser +" is valid.");
      blockchain.addBlock(transactions, nonce, hash, userId);
      console.log("Block added to the blockchain:");
      console.log(blockchain.chain[blockchain.chain.length - 1]);
      io.emit("blockAdded", { block: blockchain.chain[blockchain.chain.length - 1] });

      generateProblem();


    } else {
      console.log("Solution from " + solvingUser +" is invalid.");
    }} else {
      console.log("Solution from " + solvingUser +" is invalid.");
    }
    solutionReceived = false
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

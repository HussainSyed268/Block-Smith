// Peer component in React
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { SHA256, enc } from 'crypto-js';



const Peer = () => {
  const userId = "HussainSyed";
  const [blockchain, setBlockchain] = useState([]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  const calculateSolution = (previousHash, transactions, difficulty) => {
    let nonce = 0;
    while (true) {
      const hash = calculateHash(previousHash, transactions, nonce);
      if (hash.substring(0, difficulty) === '0'.repeat(difficulty)) {
        return { hash, nonce, userId };
      }
      nonce++;
    }
  };

  const calculateHash = (previousHash, transactions, nonce) => {
    const data = previousHash + JSON.stringify(transactions) + nonce;
    const sha256 = SHA256(data).toString(enc.Hex);
    return sha256;
  };

  const sendSolution = (solution) => {
    socket.emit("solution", solution);
    console.log("Sent solution:", solution);
  };
  useEffect(() => {
    if (!socket) return;

    socket.emit("authenticate", userId);
    console.log("Authenticated with the server");

    socket.on("problem", (problemMessage) => {
      console.log("Received problem message:");
      const { previousHash, transactions, difficulty } = problemMessage;
      const solution = calculateSolution(previousHash, transactions, difficulty);
      sendSolution(solution);
    });
    socket.on("solutionRejected", (reason) => {
      console.log("Solution rejected:", reason);
    });


    socket.on("blockAdded", (data) => {
      console.log("Block added to the blockchain:");
      console.log(data.block);
      setBlockchain((prevBlockchain) => [...prevBlockchain, data.block]);
    })

    


    return () => {
      socket.off("problem");
    };
  }, [socket]);

  return (
    <div>
      <h1>Peer Component</h1>
    </div>
  );
};

export default Peer;

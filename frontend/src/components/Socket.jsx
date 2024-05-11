// Peer component in React
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
// import { createHash } from "hash.js";
import { SHA256, enc } from 'crypto-js';

const Peer = () => {
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
        console.log("Solution found:", hash);
        return { previousHash, transactions, difficulty, nonce };
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
  };
  useEffect(() => {
    if (!socket) return;

    socket.on("problem", (problemMessage) => {
      console.log("Received problem:", problemMessage);
      // Solve problem and send solution
      const { previousHash, transactions, difficulty } = problemMessage;
      const solution = calculateSolution(previousHash, transactions, difficulty);
      sendSolution(solution);
    });

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

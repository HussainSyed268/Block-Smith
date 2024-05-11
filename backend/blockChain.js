const crypto = require('crypto');

class Block {
    constructor(index, previousHash, timestamp, transactions, hash, peerId, nonce) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = hash;
        this.nonce = nonce;
        this.peerId = peerId;
    }
}

class Blockchain {
    constructor() {
        this.chain = [];
        this.createGenesisBlock();
    }

    createGenesisBlock() {
        const genesisBlock = new Block(
            0,
            "0",
            Math.floor(new Date().getTime() / 1000),
            [],
            this.calculateHash(0, "0", Math.floor(new Date().getTime() / 1000), [], 0),
            0,
            0
        );
        this.chain.push(genesisBlock);
    }

    addBlock(transactions, nonce, hash, peerId) {
        const previousBlock = this.chain[this.chain.length - 1];
        const index = previousBlock.index + 1;
        const timestamp = Math.floor(new Date().getTime() / 1000);
        const previousHash = previousBlock.hash;
        const newBlock = new Block(index, previousHash, timestamp, transactions, hash, peerId, nonce);
        this.chain.push(newBlock);
    }

    proofOfWork(index, previousHash, timestamp, transactions) {
        let nonce = 0;
        while (true) {
            const newHash = this.calculateHash(index, previousHash, timestamp, transactions, nonce);
            if (newHash.substring(0, 4) === "0000") {
                return nonce;
            }
            nonce++;
        }
    }

    calculateHash(index, previousHash, timestamp, transactions, nonce) {
        const value = `${index}${previousHash}${timestamp}${JSON.stringify(transactions)}${nonce}`;
        return crypto.createHash('sha256').update(value).digest('hex');
    }

    printChain() {
        for (const block of this.chain) {
            console.log(block);
        }
    }

    getLastBlockHash() {
        return this.chain[this.chain.length - 1].hash;
    }
}

// Usage
const blockchain = new Blockchain();
const transactions1 = ["Transaction 1", "Transaction 2"];
const transactions2 = ["Transaction 5", "Transaction 4"];
blockchain.addBlock(transactions1, 0, "", 0);
blockchain.addBlock(transactions2, 0, "", 0);
// blockchain.printChain();

module.exports = Blockchain;

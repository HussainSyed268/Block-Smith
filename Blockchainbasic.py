import hashlib
import time

class Block:
    def __init__(self, index, previous_hash, timestamp, transactions, hash, peer_id, nonce):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.transactions = transactions
        self.hash = hash
        self.nonce = nonce
        self.peer_id = peer_id

class Blockchain:
    instance = None

    @classmethod
    def get_instance(cls):
        if cls.instance is None:
            cls.instance = cls()
        return cls.instance
    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = Block(0, "0", int(time.time()), [], self.calculate_hash(0, "0", int(time.time()), [], 0), 0, 0)
        self.chain.append(genesis_block)

    def add_block(self, transactions, nonce, hash, peerID):
        previous_block = self.chain[-1]
        index = previous_block.index + 1
        timestamp = int(time.time())
        previous_hash = previous_block.hash
        new_block = Block(index, previous_hash, timestamp, transactions, hash, peerID, nonce)
        self.chain.append(new_block)

    def proof_of_work(self, index, previous_hash, timestamp, transactions):
        nonce = 0
        while True:
            new_hash = self.calculate_hash(index, previous_hash, timestamp, transactions, nonce)
            if new_hash[:4] == "0000":
                return nonce
            nonce += 1

    def calculate_hash(self, index, previous_hash, timestamp, transactions, nonce):
        value = str(index) + str(previous_hash) + str(timestamp) + str(transactions) + str(nonce)
        return hashlib.sha256(value.encode('utf-8')).hexdigest()

    def print_chain(self):
        for block in self.chain:
            print(vars(block))

    def getLastBlockHash(self):
        return self.chain[-1].hash

if __name__ == '__main__':
    blockchain = Blockchain()
    transactions1 = ["Transaction 1", "Transaction 2"]
    transactions2 = ["Transaction 5", "Transaction 4"]
    blockchain.add_block(transactions1)
    blockchain.add_block(transactions2)
    # blockchain.print_chain()

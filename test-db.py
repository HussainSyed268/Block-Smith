import pymongo
import time
import hashlib
import json
from Blockchainbasic import Blockchain
from Blockchainbasic import Block

client = pymongo.MongoClient("mongodb+srv://umehmoodbscs21seecs:RYhISqv4MEpak5Eo@cluster0.fdtkt2g.mongodb.net/")

db = client.BlockSmith
collection = db.transaction

transaction_list = [{
        "transaction_id": "1",
        "timestamp": int(time.time()),
        "type": "buy",
        "sender": "Umer",
        "recipient": "Shafeeq",
        "amount": 10
    },
{
        "transaction_id": "2",
        "timestamp": int(time.time()),
        "type": "sell",
        "sender": "Shia",
        "recipient": "Shafeeq",
        "amount": 10
    }
]

transaction_json = json.dumps(transaction_list, sort_keys=True)

# Encode the JSON string
transaction_bytes = transaction_json.encode('utf-8')

def calculate_hash(self, index, previous_hash, timestamp, transactions, nonce):
        value = str(index) + str(previous_hash) + str(timestamp) + str(transactions) + str(nonce)
        return hashlib.sha256(value.encode('utf-8')).hexdigest()

def proof_of_work(last_proof):
        nonce = 0
        while True:
                new_hash = calculate_hash(0, "0", int(time.time()), [], calculate_hash(0, "0", int(time.time()), [], 0), 0)
                if new_hash[:4] == "0000":
                        return (nonce, new_hash)
                nonce += 1



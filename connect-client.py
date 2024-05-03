import socket
import threading
import json
import hashlib
import time

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

host = socket.gethostname()
port = 1234

client_socket.connect((host, port))

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


def calculate_hash(index, previous_hash, timestamp, transactions, nonce):
    value = str(index) + str(previous_hash) + str(timestamp) + str(transactions) + str(nonce)
    return hashlib.sha256(value.encode('utf-8')).hexdigest()

def proof_of_work(last_proof):
    nonce = 0
    while True:
        timestamp = int(time.time())
        new_hash = calculate_hash(0, "0", timestamp, last_proof, nonce)
        if new_hash[:4] == "0000":
            return nonce, new_hash
        nonce += 1


def receive_messages():
    while True:
        data = client_socket.recv(1024).decode('utf-8')
        print(f"Received from server: {data}")

# Start a new thread to receive messages from the server
receive_thread = threading.Thread(target=receive_messages)
receive_thread.start()

nonce, hash_value = proof_of_work(transaction_bytes)

# Create a dictionary to hold nonce, hash_value, and client's address
# Create a dictionary to hold nonce, hash_value, and client's address
message = {
    "nonce": nonce,
    "hash_value": hash_value,
    "address": {"host": host, "port": port}  # Include client's address as a dictionary
}

# Serialize the dictionary to JSON string
message_json = json.dumps(message)

# Send the JSON string
client_socket.send(message_json.encode('utf-8'))


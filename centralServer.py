import socket
import threading
import hashlib
import time
import json
from Blockchainbasic import Block, Blockchain

SERVER_PORT = 8888
DIFFICULTY = 5  # Number of leading zeros in the hash

transactions = [
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
        "timestamp": "2024-05-04T12:50:00",
        "type": "transfer",
        "sender": "Frank",
        "recipient": "George",
        "amount": 4
    },
    {
        "transaction_id": 7,
        "timestamp": "2024-05-04T13:00:00",
        "type": "transfer",
        "sender": "George",
        "recipient": "Helen",
        "amount": 11
    },
    {
        "transaction_id": 8,
        "timestamp": "2024-05-04T13:10:00",
        "type": "transfer",
        "sender": "Helen",
        "recipient": "Ian",
        "amount": 6
    },
]


class CentralServer:
    def __init__(self, host, port):
        self.blockchain = Blockchain.get_instance()
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.peer_id_counter = 1
        self.peer_connections = {}
        self.previous_hash = ""
        self.current_hash = ""
        self.current_nonce = 0
        self.difficulty = DIFFICULTY  # Difficulty level
        self.problem_broadcast_thread = threading.Thread(target=self.listen_for_broadcast)
        self.solution_received = False  # Flag to track if solution received
        self.valid_solution_count = 0
        self.expected_valid_count = 0
        self.solving_peer = 0

    def start(self):
        try:
            self.server_socket.bind((self.host, self.port))
            self.server_socket.listen()
            print(f"Central server listening on {self.host}:{self.port}...")
            self.problem_broadcast_thread.start()
            while True:
                client_socket, address = self.server_socket.accept()
                print(f"Connected to peer at {address}")
                peer_id = self.peer_id_counter
                self.peer_connections[peer_id] = client_socket
                self.peer_id_counter += 1
                threading.Thread(target=self.handle_peer, args=(peer_id,)).start()
        except KeyboardInterrupt:
            print("Server stopped by user.")
        except Exception as e:
            print(f"Error occurred while running the central server: {e}")
        finally:
            self.server_socket.close()

    def listen_for_broadcast(self):
        while True:
            command = input()
            if command == 'B':
                if not self.solution_received:
                    self.broadcast_problem()

    def broadcast_problem(self):

        transactions_json = json.dumps(transactions, sort_keys=True)


        try:
            self.previous_hash = self.blockchain.getLastBlockHash()
            problem_message = f"Problem: Previous hash is {self.previous_hash}, Difficulty is {self.difficulty}, and the transactions are:\n{transactions_json}"
            print(f"Broadcasting problem to all peers: {problem_message}")
            for peer_id, client_socket in self.peer_connections.items():
                client_socket.send(problem_message.encode())
            self.expected_valid_count = len(self.peer_connections) - 1
        except Exception as e:
            print(f"Error occurred while broadcasting problem to peers: {e}")

    def handle_peer(self, peer_id):
        client_socket = self.peer_connections[peer_id]
        try:
            while True:
                data = client_socket.recv(1024).decode()
                if not self.solution_received and data.startswith("Hash:"):
                    self.solution_received = True
                    print(f"Received solution from peer {peer_id}: {data}")
                    self.broadcast_solution(peer_id, data)
                    self.solving_peer = peer_id
                elif data.lower() in ["valid", "invalid"]:
                    self.handle_acknowledgment(data.lower(), self.solving_peer)
        except Exception as e:
            print(f"Error occurred while handling peer {peer_id}: {e}")
        finally:
            client_socket.close()

    def broadcast_solution(self, peer_id, solution):
        try:
            parts = solution.split(", ")
            provided_hash = parts[0].split(": ")[1]
            self.current_hash = provided_hash
            provided_nonce = int(parts[1].split(": ")[1])
            self.current_nonce = provided_nonce
            solution_array = [provided_hash, provided_nonce]
            for p_id, p_socket in self.peer_connections.items():
                if p_id != peer_id:
                    p_socket.send(f"Peer {peer_id} solved: {solution_array}".encode())
        except Exception as e:
            print(f"Error occurred while broadcasting solution to peers: {e}")

    def handle_acknowledgment(self, acknowledgment, peer_id):
        if acknowledgment == "valid":
            self.valid_solution_count += 1
        elif acknowledgment == "invalid":
            pass  # No need to do anything for invalid solutions
        if self.valid_solution_count == self.expected_valid_count:
            print(f"Solution accepted by the peer {peer_id}")
            self.blockchain.add_block(
                transactions,
                self.current_nonce,
                self.current_hash,
                peer_id
            )
            print(f"Block added for {peer_id}.")
            self.blockchain.print_chain()
        else:
            print("Solution discarded due to invalidity")


def main():
    central_server = CentralServer('localhost', SERVER_PORT)
    central_server.start()
    central_server.blockchain.print_chain()


if __name__ == "__main__":
    main()

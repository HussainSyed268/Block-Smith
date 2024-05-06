import socket
import threading
import json
import random
from Blockchain import Blockchain

class CentralNode:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.clients = []
        self.blockchain = Blockchain()

    def start(self):
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen()
        print(f"Central Node listening on {self.host}:{self.port}")
        self.accept_connections()

    def accept_connections(self):
        while True:
            client_socket, client_address = self.server_socket.accept()
            print(f"Connection established with {client_address}")
            client_thread = threading.Thread(target=self.handle_client, args=(client_socket,))
            client_thread.start()

    def handle_client(self, client_socket):
        self.clients.append(client_socket)
        try:
            while True:
                # Generate random number of leading zeroes for the problem statement
                num_zeroes = random.randint(2, 6)
                problem_statement = f"Difficulty level: {num_zeroes} leading zeroes required for hash"
                
                # Send problem statement to client
                client_socket.sendall(problem_statement.encode())

                # Receive solution from client
                solution = client_socket.recv(1024).decode()
                print(f"Received solution from {client_socket.getpeername()}: {solution}")

                # Validate and process solution
                if solution:
                    # Parse solution as JSON
                    solution_data = json.loads(solution)
                    nonce = solution_data.get("nonce")
                    hash_from_client = solution_data.get("hash")

                    # Calculate hash using proof of work function
                    transactions = self.blockchain.chain[-1].transactions
                    index = len(self.blockchain.chain)
                    previous_hash = self.blockchain.chain[-1].hash
                    timestamp = int(time.time())
                    calculated_hash = self.blockchain.calculate_hash(index, previous_hash, timestamp, transactions, nonce)

                    # Validate the hash provided by the client
                    if calculated_hash == hash_from_client and calculated_hash.startswith("0" * num_zeroes):
                        print("Solution is valid.")
                        # Add block to the blockchain
                        self.blockchain.add_block(transactions)
                    else:
                        print("Solution is invalid.")

        except Exception as e:
            print(f"Error handling client: {e}")
        finally:
            self.clients.remove(client_socket)
            client_socket.close()

if __name__ == "__main__":
    central_node = CentralNode("localhost", 8888)
    central_node.start()

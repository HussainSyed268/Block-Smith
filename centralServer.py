# server.py

import socket
import threading
import hashlib

SERVER_PORT = 8888
DIFFICULTY = 5  # Number of leading zeros in the hash

class CentralServer:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.peer_id_counter = 1
        self.peer_connections = {}
        self.previous_hash = ""
        self.difficulty = DIFFICULTY  # Difficulty level
        self.problem_broadcast_thread = threading.Thread(target=self.listen_for_broadcast)
        self.solution_received = False  # Flag to track if solution received

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
        try:
            self.previous_hash = hashlib.sha256(b'first_block').hexdigest()
            problem_message = f"Problem: Previous hash is {self.previous_hash}, Difficulty is {self.difficulty}"
            print(f"Broadcasting problem to all peers: {problem_message}")
            for peer_id, client_socket in self.peer_connections.items():
                client_socket.send(problem_message.encode())
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
        except Exception as e:
            print(f"Error occurred while handling peer {peer_id}: {e}")
        finally:
            client_socket.close()

def main():
    central_server = CentralServer('localhost', SERVER_PORT)
    central_server.start()

if __name__ == "__main__":
    main()

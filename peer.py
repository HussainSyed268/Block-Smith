# peer1.py and peer2.py

import socket
import hashlib

PEER_PORT = 9999  # for peer1.py
# PEER_PORT = 9998  # for peer2.py

class Peer:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.has_sent_response = False

    def connect_to_server(self):
        try:
            self.server_socket.connect(('localhost', 8888))
            print("Connected to central server")
        except Exception as e:
            print(f"Error occurred while connecting to central server: {e}")

    def solve_problem_and_send_answer(self):
        try:
            # Receive problem message from server
            problem_message = self.server_socket.recv(1024).decode()
            print(f"Received problem from server: {problem_message}")
            # Extract previous hash and difficulty from problem message
            previous_hash, difficulty = self.extract_problem_info(problem_message)
            # Calculate nonce value and next hash
            nonce = 0
            while True:
                nonce_str = str(nonce)
                hash_result = hashlib.sha256((previous_hash + nonce_str).encode()).hexdigest()
                if hash_result[:difficulty] == "0" * difficulty:
                    print(f"Found nonce: {nonce}")
                    print(f"Next hash: {hash_result}")
                    if not self.has_sent_response:
                        self.send_hash_and_nonce(hash_result, nonce)
                        self.has_sent_response = True
                    break
                nonce += 1
        except Exception as e:
            print(f"Error occurred while solving problem and sending answer: {e}")

    def extract_problem_info(self, problem_message):
        parts = problem_message.split("Difficulty is ")
        previous_hash = parts[0].split("Previous hash is ")[1]
        difficulty = int(parts[1])
        return previous_hash, difficulty

    def send_hash_and_nonce(self, hash_result, nonce):
        try:
            message = f"Hash: {hash_result}, Nonce: {nonce}"
            self.server_socket.send(message.encode())
            print("Sent hash and nonce to server")
        except Exception as e:
            print(f"Error occurred while sending hash and nonce to server: {e}")

    def close_connection(self):
        self.server_socket.close()


def main():
    peer = Peer('localhost', PEER_PORT)
    peer.connect_to_server()
    peer.solve_problem_and_send_answer()
    peer.close_connection()


if __name__ == "__main__":
    main()

import socket
import hashlib

PEER_PORT = 9998  # for peer1.py
# PEER_PORT = 9998  # for peer2.py

class Peer:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.has_sent_response = False
        self.previous_hash = ""
        self.transaction = b""

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
            previous_hash, difficulty, transactions = self.extract_problem_info(problem_message)
            self.previous_hash = previous_hash
            self.transaction = transactions

            # Calculate nonce value and next hash
            nonce = 0
            while True:
                nonce_str = str(nonce)
                transactions_binary = bytes('\n'.join(transactions), 'utf-8')
                hash_result = hashlib.sha256((previous_hash + nonce_str + str(transactions_binary)).encode()).hexdigest()
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
        difficulty_str, transactions = parts[1].split(", and the transactions are:\n")
        difficulty = int(difficulty_str.strip())  # Strip any whitespace characters
        transactions = transactions.split("\n")
        return previous_hash, difficulty, transactions

    def send_hash_and_nonce(self, hash_result, nonce):
        try:
            message = f"Hash: {hash_result}, Nonce: {nonce}"
            self.server_socket.send(message.encode())
            print("Sent hash and nonce to server")
        except Exception as e:
            print(f"Error occurred while sending hash and nonce to server: {e}")

    def send_acknowledgment(self, acknowledgment):
        try:
            self.server_socket.send(acknowledgment.encode())
        except Exception as e:
            print(f"Error occurred while sending acknowledgment to server: {e}")

    def receive_solution(self):
        try:
            # Receive solution message from server
            solution_message = self.server_socket.recv(1024).decode()
            print(f"Received solution from server: {solution_message}")

            # Extract peer ID and solution content from the solution message
            parts = solution_message.split(": ", 1)
            if len(parts) == 2:
                peer_id = parts[0].split()[1]
                solution_content = parts[1]

                # Parse solution content
                try:
                    hash_str, nonce_str = solution_content.strip().strip("[]").split(", ")
                    provided_hash = hash_str.strip("'")
                    provided_nonce = int(nonce_str)
                except ValueError:
                    print("Invalid solution message format.")
                    return

                # Validate the solution
                hash_result = hashlib.sha256((self.previous_hash + str(provided_nonce) + str(self.transaction)).encode()).hexdigest()
                print("the hash to verify", hash_result)
                if hash_result == provided_hash:
                    print(f"Solution received from peer {peer_id} is valid")
                    acknowledgment = "valid"
                else:
                    print("Received solution is invalid.")
                    acknowledgment = "invalid"
                self.send_acknowledgment(acknowledgment)
            else:
                print("Invalid solution message format.")
        except Exception as e:
            print(f"Error occurred while receiving solution: {e}")

    def close_connection(self):
        self.server_socket.close()


def main():
    peer = Peer('localhost', PEER_PORT)
    peer.connect_to_server()
    peer.solve_problem_and_send_answer()
    peer.receive_solution()
    peer.close_connection()


if __name__ == "__main__":
    main()

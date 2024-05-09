import socket
import threading
import json

clients = []  # List to keep track of connected clients (host, port)

def handle_client(client_socket, addr):
    while True:
        data = client_socket.recv(1024).decode('utf-8')
        if not data:
            break
        print(f"Received from {addr}: {data}")

        # Extract the client's address from the data received
        # Extract the client's address from the data received
        # Extract the client's address from the data received
        sender_addr = json.loads(data)['address']

        # Broadcast the received data to all other clients
        for client in clients:
            client_addr = client[1]  # Extracting the address tuple from the client tuple
            if client_addr[1] != sender_addr['port'] or client_addr[0] != sender_addr['host']:
                client[0].send(data.encode('utf-8'))  # client[0] is the socket

    client_socket.close()
    clients.remove((client_socket, addr))

# Server setup
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
host = "0.0.0.0"  # Bind to all available interfaces
port1 = 1234
port2 = 9999

server_socket.bind((host, port1))
server_socket.listen(5)

print(f"Server listening on {host}:{port1}")

while True:
    client_socket, addr = server_socket.accept()
    print(f"Connection from {addr}")

    # Append (client_socket, address) tuple to clients list
    clients.append((client_socket, addr))

    # Start a new thread to handle each client
    client_thread = threading.Thread(target=handle_client, args=(client_socket, addr))
    client_thread.start()

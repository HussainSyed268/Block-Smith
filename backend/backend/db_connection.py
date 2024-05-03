import pymongo

client = pymongo.MongoClient("mongodb+srv://umehmoodbscs21seecs:RYhISqv4MEpak5Eo@cluster0.fdtkt2g.mongodb.net/")
db = client.BlockSmith
collection = db.users

#ping database

def ping_db():
    try:
        client.server_info()
        print("Connected to database")
    except Exception as e:
        print("Error connecting to database: ", e)

ping_db()

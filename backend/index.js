const express = require("express");
const app = express();
const cors = require("cors"); 
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");

app.listen(4000, () => {
    console.log("Server is running on port 4000");
    });

mongoose.connect("mongodb+srv://umehmoodbscs21seecs:RYhISqv4MEpak5Eo@cluster0.fdtkt2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("MongoDB Connection Succesful");
}).catch((err) => console.log(err.message));

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get('/api/auth/token', (req, res) => {
    const token = req.cookies.jwt; // Assuming 'jwt' is the name of your HttpOnly cookie
    if (token) {
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
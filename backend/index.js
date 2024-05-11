const express = require("express");
const app = express();
const cors = require("cors"); 
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");

app.listen(4000, () => {
    console.log("Server is running on port 4000");
    });

mongoose.connect("mongodb+srv://umehmoodbscs21seecs:RYhISqv4MEpak5Eo@cluster0.fdtkt2g.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("MongoDB Connection Succesful");
}).catch((err) => console.log(err.message));

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes);
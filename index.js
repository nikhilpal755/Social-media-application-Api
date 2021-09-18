import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import Users from './routes/users.js';
import Auth from "./routes/auth.js";
import Posts from "./routes/posts.js";


const app = express();
const port = process.env.PORT || 3000;
app.listen(port , () => console.log("app is running"));


// loading a .env file
dotenv.config();


// connection to mongoDB atlas
mongoose.connect(process.env.MONGO_URL , {useNewUrlParser : true, useUnifiedTopology : true})
.then( () => console.log("connected to mongo Atlas"))
.catch((err) => console.log(err));

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use("/api/users" , Users );
app.use("/api/auth" , Auth);
app.use("/api/posts", Posts);


app.get("/" , (req, res) =>{
    res.send("Root route of app")   
})


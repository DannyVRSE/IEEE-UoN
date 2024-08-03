import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";
import db from "./postgre.js";

const app = express();
env.config();

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

//db
async function connect() {
    try {
        await db.connect();
        console.log("Connected to database");
    } catch (err) {
        console.error(err);
    }
}

connect();
//routes

ViteExpress.listen(app, PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
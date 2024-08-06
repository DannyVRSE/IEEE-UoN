import express from "express";
import ViteExpress from "vite-express";
import env from "dotenv";
import bodyParser from "body-parser";
env.config();

const app= express();

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

ViteExpress.listen(app, PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
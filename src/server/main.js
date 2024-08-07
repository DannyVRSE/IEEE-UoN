import express from "express";
import ViteExpress from "vite-express";
import env from "dotenv";
import memberRoutes from "./Routes/memberRoutes.js";
import db from "./Models/index.js";
import process from "node:process";
env.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));//similar to body-parser
//app.use(helmet());

//sync database
db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synchronized...");
}).catch((err) => {
    console.log(err);
})

 //routes
 app.use("/api/members", memberRoutes);

ViteExpress.listen(app, PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
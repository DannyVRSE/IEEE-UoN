import express from "express";
import ViteExpress from "vite-express";
import env from "dotenv";
import memberRoutes from "./Routes/memberRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import db from "./Models/index.js";
import process from "node:process";
import passport from "passport";
import passportAuth from "./Config/passport.js";
env.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));//similar to body-parser
app.use(passport.initialize());
passportAuth(passport);
//app.use(helmet());

//sync database
db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synchronized...");
}).catch((err) => {
    console.log(err);
})

//routes
app.use("/api/members", memberRoutes);
app.use("/api/admin", adminRoutes);

ViteExpress.listen(app, PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

//test
/*if (process.env.NODE_ENV === "test") {
    app.listen(3000, () => console.log(`⚡️[server]: Server is running at https://localhost:3000`))
}*/

export default app;
    import express from "express";
    import ViteExpress from "vite-express";
    import env from "dotenv";
    import memberRoutes from "./Routes/memberRoutes.js";
    import adminRoutes from "./Routes/adminRoutes.js";
    import db from "./Models/index.js";
    import process from "node:process";
    import passport from "passport";
    import ejs from "ejs";
    import path from "path";
    import passportAuth from "./Config/passport.js";
    import { fileURLToPath } from "node:url";
    env.config();

    const PORT = process.env.PORT || 5000;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const app = express();

    app.set("view engine", "ejs");
    app.set("views", path.resolve(__dirname, "views"));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));//similar to body-parser
    
    //app.use(express.static(path.resolve("../../dist")));//serve static files from dist folder
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

    //Handle react routing, return all requests to the app and let react-router handle the routing
    /*app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
    })*/

    ViteExpress.listen(app, PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

    //test
    /*if (process.env.NODE_ENV === "test") {
        app.listen(3000, () => console.log(`⚡️[server]: Server is running at https://localhost:3000`))
    }*/

    export default app;
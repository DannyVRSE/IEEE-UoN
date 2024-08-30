    import express from "express";
    import ViteExpress from "vite-express";
    import env from "dotenv";
    import memberRoutes from "./v1/Routes/memberRoutes.js";
    import adminRoutes from "./v1/Routes/adminRoutes.js";
    import db from "./Models/index.js";
    import process from "node:process";
    import passport from "passport";
    import ejs from "ejs";
    import path from "path";
    import passportAuth from "./Config/passport.js";
    import { fileURLToPath } from "node:url";
    import swaggerDocs from "./v1/swagger.js";
    env.config();

    const PORT = process.env.PORT || 5000;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const app = express();

    app.set("view engine", "ejs");
    app.set("views", path.resolve(__dirname, "views"));

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
    app.use("/api/v1/members", memberRoutes);
    app.use("/api/v1/admin", adminRoutes);

    ViteExpress.listen(app, PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        swaggerDocs(app);//docs
    })


    //optional test
    /*if (process.env.NODE_ENV === "test") {
        app.listen(3000, () => console.log(`⚡️[server]: Server is running at https://localhost:3000`))
    }*/

    export default app;
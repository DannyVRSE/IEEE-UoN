import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    definition:{
        openapi: "3.0.0",
        info:{
            title: "IEEE UoN API",
            version: "1.0.0",
            description: "IEEE UoN API Documentation"
        },    
    },
    apis:["./src/server/v1/routes/*.js"],
}

//docs in json format
const swaggerSpec = swaggerJsdoc(options);

//set up docs
const swaggerDocs = (app)=>{
    //route handler to visit docs
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    //docs in json format
    app.get("/api/v1/docs/json", (req, res)=>{
        res.setHeader("Content-Type", "application/json");
        res.json(swaggerSpec);
    });
    console.log(`Version 1 docs available at .../api/v1/docs`);
}

export default swaggerDocs;
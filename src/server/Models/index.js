import { Sequelize, DataTypes } from "sequelize";
import env from "dotenv";
import memberModel from "./member.js";
import tokenModel from "./token.js";
import societyModel from "./society.js";
import junctionModel from "./junction.js";
import process from "node:process"

env.config();

//connect to db
const sequelize = new Sequelize(process.env.DATABASE_URL);

try {
    await sequelize.authenticate();
    console.log("Connection to database successful");
} catch (error) {
    console.log("Error connecting to the database", error);
}

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

//connect models to db
db.Member= await memberModel(sequelize, DataTypes);
db.Token=await tokenModel(sequelize, DataTypes);
db.Society=await societyModel(sequelize, DataTypes);
db.MembersSocieties=await junctionModel(sequelize, DataTypes);

//associations
db.Member.belongsToMany(db.Society, { through: db.MembersSocieties });
db.Society.belongsToMany(db.Member, { through: db.MembersSocieties });

db.Member.hasOne(db.Token,{
    as:"Token",
    foreignKey:"member_id"
});

db.Token.belongsTo(db.Member,{
    as:"Member",
    foreignKey:"member_id"
});

export default db;
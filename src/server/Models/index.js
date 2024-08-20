import { Sequelize, DataTypes } from "sequelize";
import env from "dotenv";
import memberModel from "./member.js";
import tokenModel from "./token.js";
import societyModel from "./society.js";
import membershipModel from "./membership.js";
import process from "node:process"

env.config();

//connect to db
const sequelize = new Sequelize(process.env.DATABASE_URL);

//test connection
const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to database successful");
    } catch (error) {
        console.log("Error connecting to the database", error);
    }
}

connect();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connect models to db
db.Member = memberModel(sequelize, DataTypes);
db.Token = tokenModel(sequelize, DataTypes);
db.Society = societyModel(sequelize, DataTypes);
db.Membership = membershipModel(sequelize, DataTypes);

//associations
//set up many to many association
db.Member.belongsToMany(db.Society, { through: db.Membership, foreignKey:"member_id"});
db.Society.belongsToMany(db.Member, { through: db.Membership, foreignKey:"society_id"});

db.Member.hasOne(db.Token, {
    as: "Token",
    foreignKey: "member_id",
});

db.Token.belongsTo(db.Member, {
    as: "Member",
    foreignKey: "member_id",
});

export default { db, sequelize };
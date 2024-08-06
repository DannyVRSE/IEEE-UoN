import { Sequelize, DataTypes } from "sequelize";
import env from "dotenv";
import memberModel from "./members.js";
import tokenModel from "./token.js";
import societyModel from "./society.js";
import junctionModel from "./junction.js";

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
db.Member=memberModel(sequelize, DataTypes);
db.Token=tokenModel(sequelize, DataTypes);
db.Society=societyModel(sequelize, DataTypes);
db.MembersSocieties=junctionModel(sequelize, DataTypes);

//associations
db.Member.belongsToMany(db.Society, { through: db.MembersSocieties });
db.Society.belongsToMany(db.Member, { through: db.MembersSocieties });

db.Member.hasOne(db.Token,{
    as:"token",
    foreignKey:"member_id"
});

db.Token.belongsTo(db.Member,{
    foreignKey:"member_id"
});

export default db;
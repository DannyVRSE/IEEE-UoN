import pg from "pg";
import env from "dotenv";
env.config();

const db= new pg.Client({
connectionString: process.env.DATABASE_URL,
/*ssl:{
rejectUnauthorized:false
} */
});

export default db;

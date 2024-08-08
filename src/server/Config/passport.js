import JWT from 'passport-jwt';
import db from '../Models/index.js';
import process from "node:process";

const JWTStrategy = JWT.Strategy;
const ExtractJWT = JWT.ExtractJwt;

const Member = db.Member;

//options

const opts= {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),//extract jwt from authorization header
    secretOrKey: process.env.JWT_SECRET//secret key
}

//strategy
const passportAuth = (passport)=>{
    console.log("passport auth...");
    try{
        passport.use(
            new JWTStrategy(opts, async (jwt_payload, done)=>{
                //find user by id
                const user = await Member.findOne({where:{member_id:jwt_payload.id}});
                if(!user){
                    done(null, false);
                }else{
                    done(null, user);
                }
            })
        )
    }catch(err){
        console.log(err);
        throw err;
    }
}

export default passportAuth;

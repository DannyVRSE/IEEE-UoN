import db from "../Models/index.js";

const Member = db.Member;

//check if email is already in db
const saveMember = async (req, res, next) => {
    try {
        //query email
        const email = await Member.findOne({
            where: { email: req.body.email },
        });
        //email already exists in database
        if (email) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
        next();
    } catch (error) {
        console.log(error)
    }
};

export default saveMember;
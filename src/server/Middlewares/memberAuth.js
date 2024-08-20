import database from "../Models/index.js";
const { db } = database;//import db instance
const Member = db.Member;

//check if email is already in db
const saveMember = async (req, res, next) => {
    try {
        const userEmail = await req.body.registrationForm.email;
        console.log(userEmail, "email");
        //query email
        const email = await Member.findOne({
            where: { email: userEmail },
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
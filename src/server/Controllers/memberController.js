import database from "../Models/index.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendingMail from "../Config/nodemailer.js";
import jwt from "jsonwebtoken";
import process from "node:process";
import { QueryTypes } from "sequelize";
import Joi from "joi";

//get models from database
//'sequelize' for use with raw queries, db for ORM

const { db, sequelize } = database;

const Member = db.Member;
const Membership = db.Membership;
const Token = db.Token;
const saltrounds = 10;

//sign up
const signUp = async (req, res) => {

    try {
        //receive post data
        let { name, email, reg_no, year, ieee_no, phone, password } = req.body.registrationForm;

            const userInfo = {
                name: name,
                email: email,
                reg_no: reg_no,
                year: year,
                ieee_no: ieee_no === "" || ieee_no === null || ieee_no === undefined ? null : ieee_no,
                phone: phone,
                password: await bcrypt.hash(password, saltrounds),
            };

        //user input validation
        const signUpSchema = Joi.object({
            name: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).required(),
            email: Joi.string().email().pattern(new RegExp('^[\\w\\.-]+@students\\.uonbi\\.ac\\.ke$')).required(),
            reg_no: Joi.string().required(),
            year: Joi.string().required(),
            ieee_no: Joi.number().integer().allow(null),
            phone: Joi.string().pattern(new RegExp('^[0-9]{10,}$')).required(),
            password: Joi.string().required()
        });

        // console.log(data, "data");
        try {
            const value = await signUpSchema.validateAsync(userInfo);
            console.log(value, "value");
        } catch (err) {
            console.log(err, "error");
            return res.status(400).send({ message: "Invalid data. Check that you have entered the correct format!" });
        }

        //create member
        const member = await Member.create(userInfo);

        if (member) {
            let setToken = await Token.create({
                member_id: member.member_id,
                token: crypto.randomBytes(16).toString('hex'),
            });

            if (setToken) {

                const host = req.headers.host;//get host from request headers
                const protocol = req.protocol//http or https
                const verificationLink = `${protocol}://${host}/api/v1/members/verify-email/${member.member_id}/${setToken.token}`
                console.log(verificationLink);

                //send mail to user
                sendingMail({
                    from: process.env.EMAIL,
                    to: `${email}`,
                    subject: "IEEE UoN Verification",
                    html: `
            <html>
            <body>
                <p>Hello ${name},</p>
                <p>Please verify your email by opening this link:</p>
                <a href="${verificationLink}">${verificationLink}</a>
                <p>Thank you!</p>
                <br/>
                <p>If you did not initiate this process, kindly ignore this email</p>
                <p>IEEE UoN Team</p>
            </body>
            </html>
        `
                });
            } else {
                res.status(400).send("Token not created");
            }
            console.log("member", JSON.stringify(member, null, 2))

            //send users details
            return res.status(201).send(member);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};

//verify email
const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;

        //find user by token using the where clause
        const memberToken = await Token.findOne({
            token,
            where: {
                member_id: req.params.id,
            },
        });
        console.log(memberToken);

        if (!memberToken) {

            res.render("email-verification", {
                msg: "Your verification link may have expired. Please click on resend for verify your Email.",
            })

            return res.status(400).send();

            //if token exist, find the user with that token
        } else {
            const member = await Member.findOne({ where: { member_id: req.params.id } });
            if (!member) {
                console.log(member);

                res.render("email-verification", {
                    msg: "We were unable to find a user for this verification. Please SignUp!",
                })

                return res.status(401).send();


                //if user is already verified, tell the user to login
            } else if (member.verified) {

                res.render("email-verification", {
                    msg: "User has already been verified. Please Login",
                })

                return res
                    .status(200)
                    .send();

                //if user is not verified, change the verified to true by updating the field
            } else {
                const updated = await member.update(
                    { verified: true },
                    {
                        where: {
                            member_id: memberToken.member_id,
                        },
                    }
                );
                console.log(updated);

                //if not updated send error message
                if (!updated) {

                    res.render("email-verification", {
                        msg: "Error verifying email",
                    })

                    return res.status(500).send();
                    //else send status of 200
                } else {
                    res.render("email-verification", {
                        msg: "Your account has been successfully verified",
                    })
                    return res
                        .status(200)
                        .send();
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};

//login authentication
const login = async (req, res) => {
    try {
        //get email and password from request body
        const { email, password } = req.body.loginForm;
        console.log(email, password, "email and password");
        //find member
        const member = await Member.findOne({ where: { email: email } });
        if (member) {
            //compare password
            const isSame = bcrypt.compare(password, member.password);
            if (isSame) {
                console.log("password is correct");
                //check if user is verified
                const verified = member.verified;
                if (verified) {
                    //create token
                    const token = jwt.sign({ id: member.member_id }, process.env.JWT_SECRET, {
                        expiresIn: 1 * 24 * 60 * 60 * 1000,
                    });
                    //console.log(token, "token");
                    //send token
                    return res.json({ token });
                } else {
                    return res.status(401).send({ message: "User not verified" });
                }
            } else {
                return res.status(401).send({ message: "Incorrect password" });
            }
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.log(error)
    }

}

const getAuthStatus = async (req, res) => {
    if (req.user) {
        //get societies the member has joined
        const registeredSocieties = await sequelize.query(`
            SELECT "Societies".society_name, "Memberships".role, "Memberships".privilege_level
FROM "Societies"
JOIN "Memberships" ON "Societies".society_id = "Memberships".society_id
WHERE "Memberships".member_id =${req.user.member_id}
`, {
            type: QueryTypes.SELECT,
        });
        //send json
        res.status(200).json({ user: { name: req.user.name, email: req.user.email, privilege_level: req.user.privilege_level, year: req.user.year, ieee_no: req.user.ieee_no, phone: req.user.phone, societies: registeredSocieties } });
    } else {
        res.status(401).json({ auth: "false" });
    }
}

const joinSociety = async (req, res) => {
    try {
        const { email, society } = req.body;
        //console.log(email, society)
        //get member
        const member = await Member.findOne({ where: { email } });
        //get society
        const societyData = await db.Society.findOne({ where: { society_name: society } });
        //create membership
        const membership = await Membership.create({ member_id: member.member_id, society_id: societyData.society_id });
        if (membership) {
            return res.status(201).send("Membership created")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating membership")
    }
}

const modifyMemberInfo = async (req, res) => {
    const { name, year, ieee_no, phone } = req.body.modifyProfileForm;

        const userInfo = {
            name: name,
            year: year,
            ieee_no: ieee_no === "" || ieee_no === null || ieee_no === undefined ? null : ieee_no,
            phone: phone
        }

        console.log(ieee_no, "ieee_no");
        console.log(typeof(ieee_no), "ieee_no type");

//data validation
const schema = Joi.object({
    name: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).required(),
    year: Joi.string().required(),
    ieee_no: Joi.number().integer().allow(null),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10,}$')).required()
});

try {
    const value = await schema.validateAsync(userInfo);
    console.log(value);
} catch (error) {
    return res.status(400).send({ message: "Invalid data. Check that you have entered the correct format!" });
}

await Member.update({ name: userInfo.name, year: userInfo.year, ieee_no: userInfo.ieee_no, phone: userInfo.phone }, { where: { member_id: req.user.member_id } })
    .then((response) => {
        console.log(response)
        return res.status(200).json({ message: "Member info updated!" })
    })
    .catch((error) => {
        console.log(error)
        return res.status(500).json({ message: "Error updating member info" })
    });
}

export default { signUp, verifyEmail, login, getAuthStatus, joinSociety, modifyMemberInfo };